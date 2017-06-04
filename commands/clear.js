function clear (bot) {
  return function (message, args) {
    const limit = ++args[0]
    if (limit <= 0) return message.channel.send('must specify a value of at least 1')

    message.channel.fetchMessages({ limit })
    .then(messages => messages.filter(m => m.author.id === bot.user.id))
    .then(messages => messages.deleteAll())
    .then(messages => message.channel.send(`${--messages.length} messages removed`))
    .then(message => message.delete({ timeout: 5000 }))
    .catch(err => {
      message.channel.send('an error occurred')
      console.log(err)
    })
  }
}

clear.requiredArguments = 1

module.exports = clear
