const { RichEmbed } = require('discord.js')

function quote () {
  return function (message, args, flags) {
    const { id } = flags

    message.channel.fetchMessage(id)
    .then(m => {
      const embed = new RichEmbed()
        .setAuthor(m.author.tag, m.author.avatarURL)
        .setTimestamp(m.createdAt)
        .setDescription(m.content)

      if (message.guild) {
        embed.setColor(m.member.displayColor)
      }

      message.channel.send({ embed })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

quote.requiredFlags = ['id']

module.exports = quote
