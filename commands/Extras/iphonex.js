const Discord = require('discord.js');
const fetch = require('node-fetch')//npm i node-fetch if you have it then dont do it :\
                 
module.exports = {
    name: 'iphonex',
    category: 'Imagem',
    description: 'Perfil do usuário no iphonex',
    usage: 'iphonex <user>',
    run: async (client, message, args) => {
        message.channel.startTyping();
        let mention = message.mentions.members.first();

        let m = await message.channel.send("<a:atlanta_loading:743090350490648727> **Aguarde... Adicionado imagem...**");

        if (!mention) {
            m.edit("<:atlanta_error:736144198318686278> **Mencione alguem!**");
            return message.channel.stopTyping();
        }
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=iphonex&url=${mention.user.displayAvatarURL({ size: 1024 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "iphonex-syze.png");
            await message.channel.send(attachment);
            message.channel.stopTyping();
            m.delete();
        } catch (e) {
            m.edit("<:atlanta_error:736144198318686278> **Algum erro ocorreu, Tente novamente**!");
            return message.channel.stopTyping();
        }
    }
};
