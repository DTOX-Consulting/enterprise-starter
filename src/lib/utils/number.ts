export function numberFormatter(num: number, digits?: number) {
  if (!num) return '0';
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.\d*[1-9])0+$/;

  const item = findLookupItem(num, lookup);

  return (num / item?.value).toFixed(digits ?? 1).replace(rx, '$1') + item?.symbol;
}

function findLookupItem(num: number, lookup: { value: number; symbol: string }[]) {
  for (let i = lookup.length - 1; i >= 0; i--) {
    if (num >= lookup[i].value) {
      return lookup[i];
    }
  }
  return lookup[0];
}
