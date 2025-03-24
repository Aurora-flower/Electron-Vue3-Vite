const { createWriteStream, readFileSync } = require('fs');
const { rimraf } = require('rimraf');
const { exec } = require('child_process');

function execSetup(command) {
  return new Promise((resolve) => {
    const child = exec(command);
    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    child.stderr.on('data', (data) => {
      console.log(data.toString());
    });
    child.on('close', (code) => {
      resolve(code);
      console.log('close', code);
    });
  });
}

function writeFile(file, data) {
  return new Promise((resolve, reject) => {
    const ws = createWriteStream(file);
    ws.on('error', reject);
    ws.on('close', resolve);
    ws.write(data);
    ws.end();
  });
}

(async () => {
  await rimraf('app');
  const command = `npm run build-only ${process.argv.slice(2).join(' ')}`;
  const code = await execSetup(command);
  if (code === 0) {
    console.log('build success');
  } else {
    console.log('build fail');
  }
  const buffer = readFileSync('package.json');
  const outDir = 'app/';
  const config = 'package.json';
  const { name, main, author, private, version, description, dependencies } =
    JSON.parse(buffer.toString());
  const distPackage = {
    name,
    main: main.replace(outDir, ''),
    author,
    private,
    version,
    description,
    dependencies,
  };
  await writeFile(`${outDir + config}`, JSON.stringify(distPackage, null, 2));
  console.log(config, distPackage);
})();
