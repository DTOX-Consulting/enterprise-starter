import ms from 'ms';

const formats = {
  second: {
    short: 'sec',
    long: 'second',
    ms: 1000,
    max: 60
  },
  minute: {
    short: 'min',
    long: 'minute',
    ms: 1000 * 60,
    max: 60
  },
  hour: {
    short: 'hr',
    long: 'hour',
    ms: 1000 * 60 * 60,
    max: 24
  },
  day: {
    short: 'day',
    long: 'day',
    ms: 1000 * 60 * 60 * 24,
    max: 7
  },
  week: {
    short: 'wk',
    long: 'week',
    ms: 1000 * 60 * 60 * 24 * 7,
    max: 4
  },
  month: {
    short: 'mo',
    long: 'month',
    ms: 1000 * 60 * 60 * 24 * 30,
    max: 12
  },
  year: {
    short: 'yr',
    long: 'year',
    ms: 1000 * 60 * 60 * 24 * 365,
    max: 100000
  }
} as const;

type Unit = keyof typeof formats;

const units = Object.keys(formats) as Unit[];

export function formatter(difference: number, unit: Unit = 'second', short = false) {
  const format = formats[unit];
  const count = Math.floor(difference / format.ms);
  const label = short ? format.short : format.long;
  const finalLabel = count === 1 ? label : `${label}s`;
  return `${count} ${finalLabel}`;
}

export function getDifference(date: string | Date) {
  const currentDate = new Date();
  const lastUpdatedDate = new Date(date);
  return currentDate.getTime() - lastUpdatedDate.getTime();
}

export function formatDate(date: string | Date, short?: boolean): string {
  const difference = getDifference(date);

  for (const unit of units) {
    const format = unit && formats[unit];

    if (difference < format.ms * format.max) {
      return formatter(difference, unit, short);
    }
  }

  // Default return if the difference is very small
  return 'Just now';
}

export function formatLastUpdated(lastUpdated: string | Date): string {
  return `Updated ${formatDate(lastUpdated)} ago`;
}

export function formatCreatedAt(createdAt: string | Date): string {
  return `${formatDate(createdAt, true)} ago`;
}

export const timeAgo = (timestamp?: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never';
  return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? '' : 'ago'}`;
};

export function formatDateLocal(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
