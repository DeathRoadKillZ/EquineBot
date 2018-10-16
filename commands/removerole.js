const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) =>{
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry you cannot do that!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Cannot find user");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Cannot find role");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Cannot find role");

  if(!rMember.roles.has(gRole.id)) return message.reply("They do not have that role");
  await(rMember.removeRole(gRole.id));

  try{
   await rMember.send(`You have lost the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`<@${rMember.id} has lost the role ${gRole.name}`)
  }
};

module.exports.help = {
  name: "removerole"
}
