import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  CommandInteraction,
  EmbedBuilder,
  GuildTextBasedChannel,
  SlashCommandBuilder,
} from 'discord.js'
import { emoji } from '../utils/emojis'

export const command = new SlashCommandBuilder()
  .setName('signup')
  .setDescription('Allows Mac to create a signup message')
  .setDMPermission(false)

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  if (interaction.user.id !== '491002268401926145') return
  const signupChannel = interaction.channel as GuildTextBasedChannel

  const sEmbed = new EmbedBuilder()
    .setTitle(`:fire: Catfight Tournament Signup`)
    .setColor('#DE3268')
    .setDescription(`Sign up for the Catfight Tournament below!`)

  const cEmbed = new EmbedBuilder()
    .setTitle(`0 angry cats have signed up!`)
    .setColor('#DE3268')

  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`signup_catfight`)
      .setEmoji('🔥')
      .setStyle(ButtonStyle.Success)
      .setLabel(`Sign Up`)
  )

  signupChannel.send({
    embeds: [sEmbed, cEmbed],
    components: [buttons],
  })
  interaction.reply({
    content: `${emoji.online} Signup created!`,
    ephemeral: true,
  })
}
