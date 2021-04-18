const express = require("express");
const axios = require("axios");
const router = express.Router();
const verify = require("../commons/verifyToken");
const moment = require("moment");
const { quotesUrl, monedas, fabankQuote } = require("../commons/quotesUtils");
const { dateFormat, locale } = require("../commons/dateUtils");

router.get("/", verify, async (req, res) => {
  const cotizaciones = [];

  cotizaciones.push(fabankQuote);

  await Promise.all(
    monedas.map(async (moneda) => {
      await axios.get(quotesUrl + moneda.url).then((response) => {
        let cotizacion = response.data;
        cotizacion.nombre = moneda.nombre;
        cotizacion.fecha = moment().locale(locale).format(dateFormat);
        cotizaciones.push(response.data);
      });
    })
  );

  res.status(200).send({ ok: true, quotes: cotizaciones });
});

module.exports = router;
