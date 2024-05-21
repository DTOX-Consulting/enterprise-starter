export const generateBotCommands = (commands: string[]) => {
  if (commands.length === 0) {
    return undefined;
  }

  return commands
    .map((command, index) => {
      const isOnlyTwo = commands.length === 2;
      const isLast = index === commands.length - 1;
      const isNextToLast = index === commands.length - 2;
      const separator = isLast
        ? ''
        : isNextToLast
          ? isOnlyTwo
            ? 'or '
            : ', or '
          : (index + 1) % 3 === 0
            ? '\n\n'
            : ', ';
      return `[**${command}**]${separator}`;
    })
    .reduce((acc, current) => {
      if (acc.length === 0 || acc[acc.length - 1] === ', ') {
        acc.push(current);
      } else {
        acc[acc.length - 1] += current;
      }
      return acc;
    }, [] as string[])
    .join('')
    .trim();
};

export const generateBotActions = (actions: Record<string, string>): string =>
  Object.entries(actions)
    .map(([key, value]) => {
      return `If I choose **${key}** then ${value}`;
    })
    .join('\n');
