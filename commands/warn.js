const Discord = require ("discord.js");
const fs = require ("fs");

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) =>{

if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You cannot do that!");
let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!wUser) return message.reply("Cannot find user");
if(wUser.hasPermission("MANAGE_MEMBERS")) return message.reply("This user cannot be affected!");
let reason = args.join(" ").slice(22);

if(!warns[wUser.id]) warns[wUser.id] = {
  warns: 0
};

warns[wUser.id].warns++;

fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
  if (err) console.log(err);
});

let warnEmbed = new Discord.RichEmbed()
  .setDescription("A Warning Has Been Issued")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

let warnchannel = message.guild.channels.find(`name`, "reports");
if(!warnchannel) return message.reply("Couldn't find channel");

warnchannel.send(warnEmbed);

};

module.exports.help = {
  name: "warn"
}
