const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) =>{
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Couldn't find user.");
      let bReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You cannot do that!");
      if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person cannot be banned");

      let banEmbed = new Discord.RichEmbed()
      .setDescription("==A User Has Been Banned==")
      .setColor("#8e1919")
      .addField("Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);

      let banChannel = message.guild.channels.find(`name`, "logs");
      if(!banChannel) return message.channel.send("Can't Find Channel.");

      message.guild.member(bUser).ban(bReason);
      banChannel.send(banEmbed);
};

module.exports.help = {
  name: "ban"
}
