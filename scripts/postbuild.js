const { readFileSync, copyFileSync, writeFileSync, constants } = require('fs');

copyFileSync('LICENSE', 'dist/LICENSE', constants.COPYFILE_FICLONE);

const packageJson = JSON.parse(readFileSync('package.json'));
delete packageJson['devDependencies'];
delete packageJson['scripts'];
delete packageJson['files'];
delete packageJson['eslintConfig'];
delete packageJson['prettier'];
packageJson.main = 'cjs/Delta.js';
packageJson.module = 'esm/Delta.js';
delete packageJson['type'];
packageJson.typings = 'Delta.d.ts';
packageJson.exports = {
  '.': {
    require: './cjs/Delta.js',
    import: './esm/Delta.js',
  },
};
writeFileSync('dist/package.json', JSON.stringify(packageJson, undefined, 2));
