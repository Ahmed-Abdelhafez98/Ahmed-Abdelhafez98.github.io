const long = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatDate = (d: Date) => long.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
