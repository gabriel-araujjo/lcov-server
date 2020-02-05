/**
 * @module lib/ci
 */

/**
 * gathers environment variables
 * @return {Object} - exports ci options if they exist
 */
module.exports = function() {
  let serviceName = null;
  let jobId = null;
  let pullRequest = null;

  if (process.env.TRAVIS){
    serviceName = 'travis-ci';
    jobId = process.env.TRAVIS_JOB_ID;
    pullRequest = process.env.TRAVIS_PULL_REQUEST;
  }

  if (process.env.DRONE){
    serviceName = 'drone';
    jobId = process.env.DRONE_BUILD_NUMBER;
    pullRequest = process.env.DRONE_PULL_REQUEST;
  }

  if (process.env.JENKINS_URL){
    serviceName = 'jenkins';
    jobId = process.env.BUILD_ID;
    pullRequest = process.env.ghprbPullId;
  }

  if (process.env.CIRCLECI){
    serviceName = 'circleci';
    jobId = process.env.CIRCLE_BUILD_NUM;

    if (process.env.CI_PULL_REQUEST) {
      var pr = process.env.CI_PULL_REQUEST.split('/pull/');
      pullRequest = pr[1];
    }
  }

  if (process.env.CI_NAME && process.env.CI_NAME === 'codeship'){
    serviceName = 'codeship';
    jobId = process.env.CI_BUILD_NUMBER;
  }

  if (process.env.WERCKER){
    serviceName = 'wercker';
    jobId = process.env.WERCKER_BUILD_ID;
  }

  if (process.env.GITLAB_CI){
    serviceName = 'gitlab-ci';
    jobId = process.env.CI_BUILD_ID;
    pullRequest = process.env.CI_MERGE_REQUEST_ID;
  }

  if(process.env.APPVEYOR){
    serviceName = 'appveyor';
    jobId = process.env.APPVEYOR_BUILD_ID;
  }

  if(process.env.SURF_SHA1){
    serviceName = 'surf';
  }

  return [serviceName, jobId, pullRequest];
};
