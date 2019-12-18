console.log('in plugins file')
module.exports = (on, config) => {
  on('task', {
    failed: require('cypress-failed-log/src/failed')(),
  })
}
