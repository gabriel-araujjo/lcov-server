/**
 * @module lib/git
 */

const {execSync} = require('child_process');
const gitUrlParse = require('git-url-parse')
const fs = require('fs');
const path = require('path');

const git = {
  parse: dir => {
    if (!fs.existsSync(path.resolve(dir, '.git'))) {
      throw Error('directory does not contain git');
    }

    const com = execSync('git log --pretty=format:%H -1').toString('utf-8').trim();
    const bra = execSync('git symbolic-ref --short HEAD').toString('utf-8').trim();

    let remotes = execSync('git remote -v').toString('utf-8').split('\n');
    let rep;

    for (let url of remotes) {
      if (!/\s\(push\)$/.test(url)) continue;
      let remote = gitUrlParse(url.split(' ')[0]);
      rep = remote.pathname.replace(/.git$/, '').replace(/^\//, '');
      break;
    }

    return [rep, com, bra]
  }
};

module.exports = git;
