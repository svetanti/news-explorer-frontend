const DATE_LOCALES = "fr-CA";
const DATE_OPTIONS = { year: "numeric", month: "2-digit", day: "2-digit" };
const WEEK = 7 * 24 * 60 * 60 * 1000;

const dateFrom = new Intl.DateTimeFormat(DATE_LOCALES, DATE_OPTIONS).format(Date.now() - WEEK);
const dateTo = new Intl.DateTimeFormat(DATE_LOCALES, DATE_OPTIONS).format(Date.now());

export const NEWS_API_OPTIONS = {
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
  from: `from=${dateFrom}`,
  to: `to=${dateTo}`,
  pageSize: 'pageSize=100',
  apiKey: 'apiKey=19a7ee150200415abfcf6899be597e77',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export const BASE_URL = 'https://api.newnews.students.nomoreparties.xyz';

export const CARDS_PER_ROW = 3;
