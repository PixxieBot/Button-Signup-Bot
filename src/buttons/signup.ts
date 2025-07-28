import { ButtonInteraction, Client, APIEmbed } from 'discord.js'
import { query } from '../db'
import { errorEmbed, infoEmbed, successEmbed } from '../utils/embeds'
import { isStaffMember } from '../utils/perms'
import { maxSignups, reserveSignups } from '../globals'

export const button = {
  name: 'signup',
}

export const execute = async (
  _client: Client,
  interaction: ButtonInteraction
) => {
  if (!interaction.inCachedGuild()) return

  if (await isStaffMember(interaction.user))
    return interaction.reply({
      embeds: [
        errorEmbed(
          `Sorry ${interaction.user.username}! Staff cannot participate!`
        ),
      ],
      ephemeral: true,
    })

  // Check if the user is already signed up
  const res = await query(
    'SELECT * FROM events.catfight_signups WHERE userid = $1 AND eventid = $2',
    [interaction.user.id, interaction.message.id]
  )
  if (res.rows.length)
    return interaction.reply({
      embeds: [
        infoEmbed(`You're already signed up, ${interaction.user.displayName}!`),
      ],
      ephemeral: true,
    })

  // Check if there's space to join and reject if reserve slots are full
  const dbCount = await query(
    'SELECT COUNT(*) FROM events.catfight_signups WHERE eventid = $1',
    [interaction.message.id]
  )
  const oldCount = parseInt(dbCount.rows[0].count)
  if (oldCount >= maxSignups + reserveSignups)
    return interaction.reply({
      embeds: [
        errorEmbed(
          `Sorry ${interaction.user.username}!`,
          `The tournament is full! You're still welcome to come and spectate when it starts!`
        ),
      ],
      ephemeral: true,
    })

  // Update the count in the signup message
  const newCount = oldCount + 1 >= maxSignups ? maxSignups : oldCount + 1

  const oldEmbed = interaction.message.embeds[1]
  if (oldEmbed && (newCount <= maxSignups)) {
    const newEmbed = { ...oldEmbed.toJSON() } // Convert the embed to JSON and clone it
    newEmbed.title = `${newCount} angry cats have signed up!`

    // Filter out undefined values to ensure the embeds array is valid
    const updatedEmbeds = interaction.message.embeds
      .map((embed, index) => (index === 1 ? newEmbed : embed.toJSON()))
      .filter((embed): embed is APIEmbed => !!embed)

    await interaction.message.edit({
      embeds: updatedEmbeds,
    })
  }

  if (oldCount + 1 > maxSignups)
    interaction.reply({
      embeds: [
        infoEmbed(
          `You're on the waiting list, ${interaction.user.displayName}!`,
          `If anybody chickens out, you'll move up the list! Final participants will be announced when the tournament starts.`
        ),
      ],
      ephemeral: true,
    })
  else
    interaction.reply({
      embeds: [
        successEmbed(
          `You're signed up, ${interaction.user.displayName}!`,
          `Come back when the tournament starts to see how you fare!`
        ),
      ],
      ephemeral: true,
    })

  query(
    `INSERT INTO events.catfight_signups (timestamp, userid, eventid, channelid, username) VALUES ($1, $2, $3, $4, $5)`,
    [
      interaction.createdTimestamp,
      interaction.user.id,
      interaction.message.id,
      interaction.channel?.id ?? '0',
      interaction.user.username,
    ]
  )
  return
}
