const { runInThisContext } = require('vm')
const { inspect } = require('util')

function eval (bot) {
  return function (message, args) {
    const block = args.join(' ').trim()

    try {
      const result = runInThisContext(block, { timeout: 5000 })
      message.channel.send(`**OUTPUT** \`\`\`js\n${inspect(result)}\`\`\``)
    } catch (e) {
      message.channel.send(e.message)
      console.log(e)
    }
  }
}

eval.requiredArguments = 1

module.exports = eval
