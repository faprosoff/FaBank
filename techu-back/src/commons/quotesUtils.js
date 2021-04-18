const moment = require("moment");
const { dateFormat, locale } = require("../commons/dateUtils");

const quotesUrl = "https://api-dolar-argentina.herokuapp.com/api";

const monedas = [
  { nombre: "Dólar Banco BBVA", url: "/bbva" },
  { nombre: "Dólar Oficial", url: "/dolaroficial" },
  { nombre: "Dólar Contado con Liqui", url: "/contadoliqui" },
  { nombre: "Dólar Bolsa", url: "/dolarbolsa" },
  { nombre: "Dólar Banco Galicia", url: "/galicia" },
  { nombre: "Dólar Banco Hipotecario", url: "/hipotecario" },
  { nombre: "Dólar Banco Santander", url: "/santander" },
  { nombre: "Dólar Banco Ciudad", url: "/ciudad" },
  { nombre: "Dólar Banco Supervielle", url: "/supervielle" },
  { nombre: "Dólar Banco Patagonia", url: "/patagonia" },
  { nombre: "Dólar Banco Comafi", url: "/comafi" },
  { nombre: "Dólar Banco Nación", url: "/nacion" },
];

const fabankQuote = {
  fecha: moment().locale(locale).format(dateFormat),
  compra: "85.28",
  venta: "89.50",
  nombre: "Dólar FaBank",
};

module.exports = {
  quotesUrl,
  monedas,
  fabankQuote,
};
