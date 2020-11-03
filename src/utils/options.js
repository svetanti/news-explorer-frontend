const dateLocales = "fr-CA";
const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
const week = 7 * 24 * 60 * 60 * 1000;

const dateFrom = new Intl.DateTimeFormat(dateLocales, dateOptions).format(Date.now() - week);
const dateTo = new Intl.DateTimeFormat(dateLocales, dateOptions).format(Date.now());

export const newsApiOptions = {
  baseUrl: 'https://newsapi.org/v2/everything',
  from: `from=${dateFrom}`,
  to: `to=${dateTo}`,
  pageSize: `pageSize=100`,
  headers: {
    'Authorization': '19a7ee150200415abfcf6899be597e77',
    'Content-Type': 'application/x-www-form-urlencoded',
    
  },
};

export const BASE_URL = 'https://api.newnews.students.nomoreparties.xyz';
