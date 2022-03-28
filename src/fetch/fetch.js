import axios from 'axios';

export const fetcher = async (
  url,
  setRates,
  setError = false,
  makeRates = false,
) => {
  const baseUrl = 'https://www.cbr-xml-daily.ru/';
  try {
    const response = await axios.get(baseUrl + url);

    if (makeRates) {
      const rates = [];
      const wrongRates = response.data.Valute;
      for (let rate in wrongRates) {
        rates.push(wrongRates[rate]);
      }
      setRates(rates);
    } else {
      setRates(response.data);
    }
    return;
  } catch (e) {
    if (setError) {
      setError(e);
    }
  }
};
