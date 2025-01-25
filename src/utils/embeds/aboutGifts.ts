import { EmbedBuilder } from '@discordjs/builders'
import { emoji } from '../emojis'

const aboutEmbed = new EmbedBuilder()
  .setTitle(
    `${emoji.pixxiebot} PixxieBot's 5th Birthday Broccoli Eating Contest`
  )
  .setColor(16724838)
  .setThumbnail(`https://i.imgur.com/ifveORz.png`)
  .setDescription(
    `It's our 5th birthday! To celebrate, we've organised a bunch of events and giveaways! This broccoli eating contest is part of those celebrations!`
  )
  .addFields(
    {
      name: '👀 How does it work?',
      value: `- Every 1 to 2 hours, broccoli will randomly appear in <#676103614099488788>.\n- Click **Eat** to eat the broccoli.\n- One of the broccoli is secretly a magic broccoli but looks exactly the same as a regular broccoli.\n- On February 9th, the eater of the magic broccoli will be revealed and will win the grand prize!`,
    },
    {
      name: '🏆 What is the Grand Prize?',
      value: `- 1 year of Discord Nitro\n- Limited Edition PixxieBot profile badge`,
    },
    {
      name: '💡 Tips',
      value: `- Use </stomach:1210988958800941088> to see how many broccoli you've eaten.\n- Use </leaderboard:1210988958800941089> to see the top 10 contestants.`,
    }
  )
export default aboutEmbed
