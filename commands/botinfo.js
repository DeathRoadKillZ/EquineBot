const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) =>{
  let bicon = bot.user.displayAvatarURL;
     let botEmbed = new Discord.RichEmbed()
     .setDescription("Bot Information")
     .setColor("#f9902c")
     .setThumbnail(bicon)
     .addField("Bot Name", bot.user.username)
     .addField("Created On", bot.user.createdAt)
     .addField("Use", "This bot was created for all things horse.");

     return message.channel.send(botEmbed)
};

module.exports.help = {
  name: "botinfo"
}
