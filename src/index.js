const path = require('path');
const fs = require('fs-extra');

const exec = require('./exec').exec;
const execLater = require('./exec').execLater;
const configureExec = require('./exec').configure;
const log = require('./log').log;
const configureLog = require('./log').configure;

var options = {};

var gitInformation = {};

function getGitInformation() {
  log('getGitInformation');

  return exec('git log -n 1 --format="%H" HEAD')
    // Get current branch commit hash.
    .then(hash => gitInformation.hash = hash)
    // Get current branch commit title.
    .then(execLater('git log -n 1 --format="%s" HEAD'))
    .then(title => gitInformation.title = title)
    // Get current branch name.
    .then(execLater('git rev-parse --abbrev-ref HEAD'))
    .then(branch => gitInformation.branch = branch);
}

function checkoutOriginalBranch() {
  log('checkoutOriginalBranch');

  return exec(`git checkout ${gitInformation.branch}`);
}

function checkoutDeployBranch() {
  log('checkoutDeployBranch');

  return exec(`git checkout ${options.branch}`).then(
    () => {

    },
    (stderr) => {
      var message = stderr.message;
      if (message.indexOf('error: pathspec') > -1) {
        console.log('Did not find branch locally, creating.')
        return createGitBranch();
      } else {
        console.log(message);
        throw stderr;
      }
    }
  )
}

function createGitBranch() {
  log('createGitBranch');

  return exec(`git checkout --orphan ${options.branch}`)
    .then(execLater(`git rm --cached -r . `))
    .then(execLater(`git add .gitignore`))
    .then(execLater(`git clean -f -d`))
    .then(execLater(`git commit -m 'initial ${options.branch} commit'`))
    // Return to original branch.
    .then(checkoutOriginalBranch)
    // Resume normal code path.
    .then(checkoutDeployBranch);
}

function makeDeployBranchClean() {
  log('makeDeployBranchClean');

  return exec(`cp .gitignore ${options.src}/.gitignore`)
    .then(execLater('git rm -rf .'));
}

function copyFiles() {
  log('copyFiles');

  function filePath(fileName) {
    return path.resolve(process.cwd(), fileName);
  }

  console.log('Copying files...');
  return new Promise(function(resolve, reject) {
    fs.copy(
      filePath(options.src),
      filePath(options.target),
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  })
}

function addAndCommitToGit() {
  log('addAndCommitToGit');

  var commitMessage = `deploy: ${gitInformation.title}

  generated from commit ${gitInformation.hash}`;

  return exec(`git add .`)
    .then(stdout => {
      if (stdout.indexOf('nothing to commit') > -1) {
        console.log('Nothing to commit, no changes detected.');
      }
    })
    .then(execLater(`git commit -m '${commitMessage}'`))
    .catch(() => {
      // Catch error if there's nothing to commit.
    });
}

function pushBranchToRemote() {
  log('pushBranchToRemote');
  return exec(`git push ${options.remote} ${options.branch}`);
}

function main(opts) {
  options = opts;

  configureLog(opts);
  configureExec(opts);

  return getGitInformation()
    .then(checkoutDeployBranch)
    .then(makeDeployBranchClean)
    .then(copyFiles)
    .then(addAndCommitToGit)
    .then(checkoutOriginalBranch)
    .then(pushBranchToRemote)
    .then(() => {
      console.log('Deployed!');
    });
}

module.exports = main;