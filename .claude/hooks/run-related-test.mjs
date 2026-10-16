// PostToolUse hook: after a spec or feature file is edited, run the related Playwright tests.
// Exit code 2 feeds the failure output back to Claude so it can fix the test straight away.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

let raw = '';
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let filePath = '';
  try {
    filePath = JSON.parse(raw).tool_input?.file_path ?? '';
  } catch {
    process.exit(0);
  }
  const cwd = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
  // Playwright treats file args as regexes over project-relative paths.
  const p = relative(cwd, filePath).replace(/\\/g, '/');

  let args;
  if (/^tests\/.*\.spec\.ts$/.test(p)) {
    args = ['playwright', 'test', p, '--reporter=line'];
  } else if (/^features\/.*\.feature$/.test(p)) {
    // Run the specs that carry this feature's story tag, if any are automated yet.
    const tag = readFileSync(filePath, 'utf8').match(/@US-\d+/)?.[0];
    if (!tag) process.exit(0);
    args = ['playwright', 'test', '--grep', tag, '--reporter=line', '--pass-with-no-tests'];
  } else {
    process.exit(0);
  }

  const r = spawnSync('npx', args, { cwd, encoding: 'utf8', shell: true, timeout: 170_000 });
  if (r.status === 0) process.exit(0);
  const out = `${r.stdout ?? ''}\n${r.stderr ?? ''}`.trim().split('\n').slice(-60).join('\n');
  console.error(`Related tests failed after editing ${filePath}:\n${out}`);
  process.exit(2);
});
