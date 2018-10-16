const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) =>{
const idea = args.slice(0).join(" ");
console.log(idea, idea.length);

let suggestionembed = new Discord.RichEmbed()
.setDescription("==A User Has A Suggestion!==")
.setColor("RANDOM")
.addField("Suggested By", `${message.author}`)
.addField("Time", message.createdAt)
.addField("Suggestion", idea);

let suggestionchannel = message.guild.channels.find(`name`, "idea");
if(!suggestionchannel) return message.send("Couldn't find suggestions channel");

message.delete().catch(O_o=>{});
suggestionchannel.send(suggestionembed);

};

module.exports.help = {
  name: "suggest"
}
