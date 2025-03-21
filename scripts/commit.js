const { execSync } = require('node:child_process');
const msg = process.argv.slice(2).join(' ');

if (!msg) {
  console.error('❌ 必须提供提交信息');
  process.exit(1);
}

try {
  execSync(`git commit --no-verify -m "${msg}"`, { stdio: 'inherit' });
} catch (error) {
  console.error('提交失败:', error.message);
  process.exit(1);
}
