import browserSolc from 'browser-solc'
const getVersions = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      window.BrowserSolc.getVersions(function (soljsonSources, soljsonReleases) {
        resolve({ soljsonSources, soljsonReleases })
      })
    })
  })
}
export const getCompiler = function (version) {
  return new Promise((resolve) => {
    setTimeout(() => {
      window.BrowserSolc.loadVersion(version, (compiler) => {
        resolve(compiler)
      })
    })
  })
}
export default getVersions
