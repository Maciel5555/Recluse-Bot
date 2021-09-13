const { MessageEmbed } = require('discord.js');
const reactions = [':sweat_smile:', ':slight_smile:', ':thinking:', ':8ball:']; //Change bot's reactions
const answers = ['Sim', 'Claro', 'Talvez', 'Não', 'Impossível', 'Porque não?'];//Change bot's answers 

module.exports = {
  name: '8ball',
  usage: `8ball Você gosta de mim?` ,
  category: "mini-games",
  aliases: ["answer", "ans"],
  description: 'Responde sua pergunta',
  async run(client, message, args){ 
    const question = args.join(' ');
    if (!question) return message.channel.send('<:atlanta_error:736144198318686278> **Faça uma pergunta!**');
    const botans = new MessageEmbed()
      .setThumbnail('https://discord.com/assets/0cfd4882c0646d504900c90166d80cf8.svg')
      .setColor('RANDOM')
      .setTitle(`${client.user.username} 8ball:`)
      .setDescription(`${message.author} <:help:866155256857624598> Pergunta: \n\`${question}?\` \n<:atlanta_success:736144092123234354> Resposta: \n**${reactions[Math.floor(Math.random() * reactions.length)]} - ${answers[Math.floor(Math.random() * answers.length)]} !**`)
      .setFooter('Esse comando e so pra diversão');
      message.channel.send(botans).then(() => message.delete());
  }
}
