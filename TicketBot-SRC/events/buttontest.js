const client = require('../index.js').Client
const db = require('quick.db')
const discord = require('discord.js')
const config = require('../config.json')
const ms = require('ms')

client.on('interactionCreate', async (interaction, user) => {
	if (!interaction.isButton()) return;
    const { Permissions } = require('discord.js');
    if(interaction.isButton()) {
      if(interaction.customId == 'test') {
        let id = await db.add(`amountTickets_${interaction.message.guild.id}`, 1)
        interaction.message.guild.channels.create(`ticket-${id}`, {
              type: 'GUILD_TEXT',
              permissionOverwrites: [
              {
                  id: interaction.message.guild.id,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                  id: interaction.user.id,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
              },
          ],
    
        }).then(channel => {
      channel.send(`${user}`).then(msg => {
        msg.delete()
        interaction.reply({content: `Your ticket has been created ${channel}`, ephemeral: true,})
      })
      const closeButton = new discord.MessageButton().setLabel("close").setCustomId('close-ticket').setStyle('SECONDARY').setEmoji('❌')
      const lockButton = new discord.MessageButton().setLabel("lock").setCustomId('lock-ticket').setStyle('SECONDARY').setEmoji('🔒')
      const unlockButton = new discord.MessageButton().setLabel('unlock').setCustomId('unlock-ticket').setStyle('SECONDARY').setEmoji('🔓')
      const transcriptButton = new discord.MessageButton().setLabel('transcript').setCustomId('trans').setStyle('SECONDARY').setEmoji('📝')
      const row = new discord.MessageActionRow().addComponents([closeButton, lockButton, unlockButton, transcriptButton])
      let craxyboi = new discord.MessageEmbed()
     .setTitle(`Hello ${interaction.user.username}!`)
     .setColor(config.embedcolor)
     .setDescription("")
     .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
     .setImage(interaction.message.guild.iconURL)
     channel.send({ embeds: [craxyboi], components: [row] })
      })
    }

      if(interaction.customId == 'close-ticket') {
        if(!interaction.member.permissions.has(discord.Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({content: 'You are missing permissions', ephemeral: true})
        interaction.reply('Closing ticket in 5 seconds');setTimeout(() => {interaction.channel.delete();}, 5000);
    }

      if(interaction.customId == 'lock-ticket') {
        let channel = interaction.channel
        if(!interaction.member.permissions.has(discord.Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({content: 'You are missing permissions', ephemeral: true})

        try {
          channel.permissionOverwrites.create(channel.guild.roles.everyone, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
          });
          interaction.reply('Locked the ticket')
      }catch(e) {
          console.log(e)
      }
  
  }

    if(interaction.customId == 'unlock-ticket') {
      let channel = interaction.channel
      if(!interaction.member.permissions.has(discord.Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({content: 'You are missing permissions', ephemeral: true})

        try {
          channel.permissionOverwrites.create(channel.guild.roles.everyone, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: false
          });
          interaction.reply('Unlocked the ticket')
      }catch(e) {
          console.log(e)
      }
    }

    if(interaction.customId == 'trans') {
      let channel = interaction.channel

      let allMessages = await channel.messages.fetch();
      let systemMessages = allMessages.filter(m => m.content && m.author.id != client.user.id && !m.author.bot).map(m => ms(m.createdTimestamp, {long: true}) +" | "+ m.author.tag + ": " + m.cleanContent).join("\n");
      if(!systemMessages) systemMessages = "No messages were found."

      let attch = new discord.MessageAttachment(Buffer.from(systemMessages), `saved_transcript_${channel.id}.txt`);
      channel.send({
          content: `${interaction.user} your transcript is ready!`,
          files: [attch]
      })
      return;
    }
}});