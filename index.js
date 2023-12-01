const Discord = require("discord.js")
const config = require("./config.json")
const colors = require("colors")

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {
  if(interaction.type === Discord.InteractionType.ApplicationCommand){
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) return interaction.reply(`Error`);
      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)
   }
})

client.on('ready', () => {
  console.log('[CLIENT]'.red + ` Logado com sucesso em ${client.user.username} - ${client.user.id}`)
})


client.slashCommands = new Discord.Collection()
require('./events')(client)
require('./schema/commands_events/login')
require('./schema/commands_events/register')

client.login(config.token)