const client = require('../../index')
const Discord = require('discord.js')
const { JsonDatabase } = require('wio.db')
const account = new JsonDatabase({ databasePath: '/schema/database/accounts.json' })

client.on('interactionCreate', async(interaction, client, guild) => {

    if(!interaction.isButton()) return;
    if(interaction.customId === 'login-button') {

        let loginModal = new Discord.ModalBuilder()
        .setCustomId('loginModal')
        .setTitle('Login Modal')
        
        const emailInput = new Discord.TextInputBuilder()
        .setCustomId('loginEmail')
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


        loginModal.addComponents(
            new Discord.ActionRowBuilder().addComponents(emailInput),
            new Discord.ActionRowBuilder().addComponents(senhaInput)
        )

        await interaction.showModal(loginModal)
    } 
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isModalSubmit) return;

    if(interaction.customId === 'loginModal') {
        let email = interaction.fields.getTextInputValue('loginEmail')
        const senha = interaction.fields.getTextInputValue('loginSenha')
        email = email.replace(".com", "").toLowerCase()

        const accountExists = account.has(`${email}`)

        if(!accountExists) {
            interaction.reply({
                content: ':x: Está conta não foi encontrada',
                ephemeral: true
            })
        } else {

        if(email === account.get(`${email}`).email && senha === account.get(`${email}`).senha ) {

            let embedLogged = new Discord.EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` })
            .setColor(`#21ff76`)
            .setDescription(`:star: Você está logado na conta \`${account.get(`${email}`).username}\`.`)
            .setTimestamp()

            console.log(`[LOGIN] Novo Login Registrado: (EMAIL: ${email} | SENHA: ${senha})`)

            interaction.reply({
                embeds: [embedLogged],
                ephemeral: true
            })
        } else {
            interaction.reply({
                content: ':x: Email ou senha invalidos',
                ephemeral: true
            })
        }
    }
}
})