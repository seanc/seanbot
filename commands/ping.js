function ping (bot) {
  return function (message) {
    message.channel.send(`${bot.ping}ms`)
  }
}

module.exports = ping
