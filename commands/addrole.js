const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) =>{
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry you cannot do that!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Cannot find user");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Cannot find role");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Cannot find role");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role");
  await(rMember.addRole(gRole.id));

  try{
   await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Congrats to <@${rMember.id} has been given the role ${gRole.name}`)
  }
};

module.exports.help = {
  name: "addrole"
}
