const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  //!mute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "Muted");

  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

    let muteembed = new Discord.RichEmbed ()
    .setDescription("==A User Was Muted==")
    .setColor("#fc6400")
    .addField("User",`<@${tomute.id}>`)
    .addField("Muted By", `${message.author}`)
    .addField("In Channel", message.channel)
    .addField("Length", `${ms(ms(mutetime))}`)
    .addField("Time", message.createdAt);

    let logschannel = message.guild.channels.find(`name`, "logs");
    if(!logschannel) return message.guild.send("Couldn't find the channel.");
    logschannel.send(muteembed);
}

module.exports.help = {
  name: "mute"
}
