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
import { isStaffMember } from '../utils/perms/isStaffMember'

export const command = new SlashCommandBuilder()
  .setName('signup')
  .setDescription('Allows Staff to create a signup message')
  .setDMPermission(false)

export const execute = async (
  _client: Client,
  interaction: CommandInteraction
) => {
  if (!isStaffMember(interaction.user)) return
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
      .setEmoji('1396521925974429716')
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
