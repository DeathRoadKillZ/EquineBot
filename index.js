const botconfig = require ("./botconfig.json");
const Discord = require ("discord.js");
const fs = require ("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't Find Commands!");
    return;
  };

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Equestrian Life", {type: "WATCHING"});

}); //Status

bot.on('guildMemberAdd', member => {
  console.log(`User ${member.user.tag} has joined the server!`);
  let role = member.guild.roles.find(r => r.name === 'Member');
  member.addRole(role.id);

});  //Auto role

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member} :horse:. Please make sure to read the rules`);
});  //Welcome message

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

}); //Bot DM no reply

bot.login(botconfig.token);
