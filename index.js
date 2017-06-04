const { Client } = require('discord.js')
const minimist = require('minimist')
const config = require('./config.json')

const bot = new Client()
const commands = require('./commands')

bot.on('ready', () => {
  for (const name in commands) {
    const command = commands[name]
    console.log(`command ${command.name} loaded`)
    commands[name].run = command(bot)
  }

  console.log('ready')
})
bot.on('message', message => {
  if (message.author.id !== bot.user.id) return
  if (!message.cleanContent.startsWith('self.')) return

  const parsed = minimist(message.cleanContent.slice('self.'.length).split(' '), {
    string: ['id']
  })
  const args = parsed._
  const flags = parsed
  const command = args.shift().toLowerCase()

  if (commands.hasOwnProperty(command)) {
    const foundCommand = commands[command]
    if (foundCommand.requiredArguments && args.length < foundCommand.requiredArguments) {
      return message.channel.send(`command \`${foundCommand.name}\` requires at least \`${foundCommand.requiredArguments}\` argument(s)`)
    }

    if (foundCommand.requiredFlags && !foundCommand.requiredFlags.every(f => flags.hasOwnProperty(f))) {
      const missing = foundCommand.requiredFlags.reduce((acc, curr) => {
        if (!flags.hasOwnProperty(curr)) acc.push(curr)
        return acc
      }, [])
      return message.channel.send(`command  \`${foundCommand.name}\` requires flags \`${foundCommand.requiredFlags.join(', ')}\` and is missing flags \`${missing.join(', ')}\``)
    }

    foundCommand.run(message, args, flags)
  }
})

bot.login(config.token)
