const impls = ['cobertura', 'golang', 'jacoco', 'lcov']

module.exports = Object.fromEntries(impls, impls.map(i => require(`./${i}`)))
