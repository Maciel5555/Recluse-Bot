const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`; //Color Name In CAPS - RANDOM For Random
const Scraper = require("mal-scraper"); //npm i mal-scraper

//By Atreya YT

module.exports = {
    name: "anime",
    category: "info",
    description: "Busca informações do anime!",
    usage: "Anime <Nome do Anime>",
    run: async (client, message, args) => {

        //Start

        let Text = args.join(" ");

        if (!Text) return message.channel.send(`<:atlanta_error:736144198318686278> **Fale um anime**!`);

        if (Text.length > 200) return message.channel.send(`<:atlanta_error:736144198318686278> **O Anime não pode ter o nome tão grande!**`);

        let Msg = await message.channel.send(`<:atlanta_success:736144092123234354> **Pesquisando...**`);

        let Replaced = Text.replace(/ +/g, " ");

        await Msg.delete();

        let Anime;

        let Embed;

        try {

        Anime = await Scraper.getInfoFromName(Replaced);

        if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "Nenhum";

        Embed = new MessageEmbed()
        .setColor(Color || "RANDOM")
        .setURL(Anime.url)
        .setTitle(Anime.title)
        .setDescription(Anime.synopsis)
        .addField(`<:Rc:865979625409609728> Tipo`, Anime.type, true)
        .addField(`<:announce_dark:874348677009920120> Status`, Anime.status, true)
        .addField(`Premiered`, Anime.premiered, true)
        .addField(`Episodes`, Anime.episodes, true)
        .addField(`Duration`, Anime.duration, true)
        .addField(`Popularity`, Anime.popularity, true)
        .addField(`Gneres`, Anime.genres.join(", "))
        .setThumbnail(Anime.picture)
        .setFooter(`Score - ${Anime.score}`)
        .setTimestamp();

        } catch (error) {
          return message.channel.send(`No Anime Found!`);
        };

        return message.channel.send(Embed);

        //End

    }
};
