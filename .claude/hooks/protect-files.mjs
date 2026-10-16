// PreToolUse hook: block edits to secrets, auth state and approved visual baselines.
// Exit code 2 blocks the tool call and shows stderr to Claude.
let raw = '';
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let filePath = '';
  try {
    const input = JSON.parse(raw);
    filePath = input.tool_input?.file_path ?? input.tool_input?.notebook_path ?? '';
  } catch {
    process.exit(0);
  }
  const p = filePath.replace(/\\/g, '/');
  const rules = [
    { re: /(^|\/)\.env(\.(?!example$)[^/]*)?$/, why: '.env files hold secrets – edit them yourself' },
    { re: /(^|\/)playwright\/\.auth\//, why: 'auth storage state is generated, not hand-edited' },
    { re: /-snapshots\//, why: 'approved visual baselines – triage the failure instead of re-baselining' },
  ];
  const hit = rules.find((r) => r.re.test(p));
  if (hit) {
    console.error(`Blocked edit to ${filePath}: ${hit.why}.`);
    process.exit(2);
  }
  process.exit(0);
});
