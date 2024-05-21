export const botDisplayInstructions = () =>
  `
## Instructions
You must wait for the user to respond.
You must display everything in the order below.
You must display the title and image of the bot.
You must display the introduction and initial question of the bot.
Do not add quotes around the actual commands. i.e "[**yes**]" is incorrect, [**yes**] is correct.
--
`.trim();

export const botDisplayIdentity = (title: string, botImagePath = '/images/bots/ANA-1.jpg') =>
  `
Display the name:
"# **${title}**"

Display the image:
"![Image](${botImagePath})"
`.trim();

export const botDisplayIntroduction = (introduction: string, initialQuestion: string) =>
  `
First, say hello to the user:
"### Hello there! I'm **ANA**!"

Display the introduction:
"${introduction.trim()}"

Display the initial question:
**Lets Begin:**
"${initialQuestion.trim().replace(/\?$/, '')}?"
`.trim();
