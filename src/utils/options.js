const dateLocales = "fr-CA";
const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
const week = 7 * 24 * 60 * 60 * 1000;

const dateFrom = new Intl.DateTimeFormat(dateLocales, dateOptions).format(Date.now() - week);
const dateTo = new Intl.DateTimeFormat(dateLocales, dateOptions).format(Date.now());

export const apiOptions = {
  baseUrl: 'https://newsapi.org/v2/everything',
  from: `from=${dateFrom}`,
  to: `to=${dateTo}`,
  pageSize: `pageSize=100`,
  apiKey: 'apiKey=19a7ee150200415abfcf6899be597e77',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
};
