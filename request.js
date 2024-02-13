// es-lint unable to read the exports line in got package.json
// eslint-disable-next-line import/no-unresolved
import got from "got";

const siteURL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=4036,2143,52,1027,1,2916,1732,2758&convert=EUR";
const apiHeader = {
  "X-CMC_PRO_API_KEY": process.env.CMC_PRO_API_KEY,
};

export default async function requestCrypto() {

  const response = await got(siteURL, { headers: apiHeader });
  const { data } = JSON.parse(response.body);
  const currencyId = Object.keys(data);
  const todayCurrencyRate = {};
  currencyId.forEach((element) => {
    todayCurrencyRate[data[element].symbol] = data[element].quote.EUR.price;
  });

  return todayCurrencyRate;
}
