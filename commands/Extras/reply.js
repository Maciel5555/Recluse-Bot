const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "reply",
  category: "moderação",
  run: async (client, message, args) => {
    
let channel = await db.fetch(`suggestion_${message.guild.id}`);
if (channel === null) return;
     
      if(!message.member.hasPermission('MANAGE_GUILD')) return;
      
    const rgx = /^(?:<@!?)?(\d+)>?$/;

    const messageID = args[0];
    const replyQuery = args.slice(1).join(' ');
      
    const number = new MessageEmbed()
      .setDescription(`<:atlanta_error:736144198318686278> **Não acho que e um ID de mensagem!**`)
      .setColor("FF2052")
      
    const id = new MessageEmbed()
      .setDescription(`<:atlanta_error:736144198318686278> **Fale o ID da mensagem**!`)
      .setColor("FF2052")
      
    const query = new MessageEmbed()
      .setDescription(`<:atlanta_error:736144198318686278> **Você de especificar a resposta**!`)
      .setColor("FF2052")
      
    const reply = new MessageEmbed()
      .setDescription(`<:atlanta_success:736144092123234354> **Sugestão respondida com sucesso**.`)
      .setColor("00FFFF")
      
    const noChannel = new MessageEmbed()
      .setDescription(`<:atlanta_error:736144198318686278> **O Canal de sugestão ainda não foi setado!**`)
      .setColor("FF2052")
      
    const noMessage = new MessageEmbed()
      .setDescription(`<:atlanta_error:736144198318686278> **Não foi encontrada nenhuma mensagem com esse ID**!`)
      .setColor("FF2052")
    
      if(!messageID) return message.channel.send(id);
      
      if (!rgx.test(messageID)) return message.channel.send(number);
      
      if(!replyQuery) return message.channel.send(query)
      
      try{
      const suggestionChannel = message.guild.channels.cache.get(channel)
      
      if(!suggestionChannel) return message.channel.send(noChannel)
      
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
    const noMessage = new MessageEmbed()
      .setDescription(`<:atlanta_error:736144198318686278> **Não foi encontrada nenhuma mensagem com esse ID**!`)
      .setColor("FF2052")
  return message.channel.send(noMessage);
  })
     
      const data = suggestedEmbed.embeds[0];
     
      const replyEmbed = new MessageEmbed()
      .setAuthor(`${data.author.name}`, data.author.iconURL)
      .setDescription(data.description)
      .setColor("BLUE")
      .addField(`Requisitada Por ${message.author.
      .setFooter("Status: Replied")
      .setTimestamp();
      
     suggestedEmbed.edit(replyEmbed)
     
     message.channel.send(reply)
      
      const user = await client.users.cache.find((u) => u.tag === data.author.name)
      
    const embed = new MessageEmbed()
      .setDescription(`<:atlanta_success:736144092123234354> Você recebeu uma respota pra sua sugestão**. **[Mensagem Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
      .setColor("BLUE")
      user.send(embed)
        
      } catch(err) {
        return;
    }
  }
}
