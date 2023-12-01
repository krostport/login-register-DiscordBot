const client = require('../../index')
const Discord = require('discord.js')
const { JsonDatabase } = require("wio.db")
const accounts = new JsonDatabase({ databasePath: "./schema/database/accounts.json" })

client.on('interactionCreate', async(interaction, client, guild) => {
    if(!interaction.isButton()) return;
    if(interaction.customId === 'register-button') {
        
        let registerModal = new Discord.ModalBuilder()
        .setCustomId('registerModal')
        .setTitle('Login Modal')

        const usernameInput = new Discord.TextInputBuilder()
        .setCustomId('registerUsername')
        .setLabel('Username:')
        .setPlaceholder('Carinha De Souza')
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Short)
        
        const emailInput = new Discord.TextInputBuilder()
        .setCustomId('registerEmail')
        .setLabel('Email:')
        .setPlaceholder('exemplo@dominio.com')
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Short)

        const senhaInput = new Discord.TextInputBuilder()
        .setCustomId('loginSenha')
        .setLabel('Senha:')
        .setPlaceholder('123456')
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Short)


        registerModal.addComponents(
            new Discord.ActionRowBuilder().addComponents(usernameInput),
            new Discord.ActionRowBuilder().addComponents(emailInput),
            new Discord.ActionRowBuilder().addComponents(senhaInput)
        )

        await interaction.showModal(registerModal)

    }
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isModalSubmit()) return ;
    if(interaction.customId ==='registerModal') {
        const username = interaction.fields.getTextInputValue('registerUsername')
        let email = interaction.fields.getTextInputValue('registerEmail')
        const senha = interaction.fields.getTextInputValue('loginSenha')
    
        const accountExists = accounts.exists(`${email}`)

        if(accountExists) {
            interaction.reply({
                content: ':x: Email já cadastrado no meu sistema!',
                ephemeral: true
            })
        } else {

        email = email.replace(".com", "").toLowerCase()

        accounts.set(`${email}`, {
            username: `${username}`,
            email: `${email}`,
            senha: `${senha}`
        }
        )

        console.log(`[REGISTRO] Nova conta registrada: (NOME: ${username} | EMAIL: ${email} | SENHA: ${senha})`)
        console.log(`[REGISTRO] ^^^^^ | Conta registrada por ${interaction.user.username}`)

        await interaction.reply({
            content: ':star: Cadastro realizado com sucesso! ',
            ephemeral: true
        })
    }
}
})