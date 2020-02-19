module.exports = {
  hooks: {
    'pre-commit': 'yarn update:schema && lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
