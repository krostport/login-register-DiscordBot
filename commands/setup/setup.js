const Discord = require("discord.js")
const { ActionRowBuilder } = require("discord.js")
const owners = require('../../config.json')

module.exports = {
    name:"send-setup",
    description: "[⭐] Setup de login e registro",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        const ownersx = owners.owners.includes(interaction.user.id)


        if(!ownersx) {
            return interaction.reply({
                content: "Você não tem permissão para executar este comando!",
                ephemeral: true
            })
        } else {
            let embed = new Discord.EmbedBuilder()
            .setAuthor({ name:'Login E Registro', iconURL: interaction.guild.iconURL() })
            .setColor("#21ff76")
            .setDescription(`
            :open_file_folder: **SISTEMA DE LOGIN E REGISTRO**
            > **Login:** \`Email\` e \`Senha\`
            > **Registro:** \`Nome\`, \`Email\` e \`Senha\`

            ⭐ **Use os botões abaixo para se cadastrar ou logar**
            `)

            let loginButton = new Discord.ButtonBuilder()
            .setCustomId('login-button')
            .setEmoji('<:icons_djoin:1178391856539775036>')
            .setLabel('Login')
            .setStyle(Discord.ButtonStyle.Success)

            let registerButton = new Discord.ButtonBuilder()
            .setCustomId('register-button')
            .setEmoji('<:icons_join:1178391899158106113>')
            .setLabel('Registrar')
            .setStyle(Discord.ButtonStyle.Primary)

            let row = new Discord.ActionRowBuilder().addComponents(
                loginButton,
                registerButton
            )

            interaction.reply({ embeds: [embed], components: [row] })

        }
    }
}