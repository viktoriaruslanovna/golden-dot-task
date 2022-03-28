import { useState, useEffect } from 'react';
import styles from '../components/scss/rate.module.scss';
import { fetcher } from '../fetch/fetch';
import RateList from '../components/RateList';
import Loader from '../components/Loader';

function RatePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rates, setRates] = useState([]);

  useEffect(async () => {
    setLoading(true);
    await fetcher('daily_json.js', setRates, setError, true);
    setLoading(false);
  }, []);

  return (
    <div className={styles.ratepage}>
      <div className={styles.ratepage__prewiew}>
        <h1>Курсы валют ЦБ РФ</h1>
        <p>
          Предоставлена информация о курсах обмена валюты, установленных
          Центральным Банком Российской Федерации. Курсы иностранных валют к
          рублю по ЦБ на сегодня
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Ошибка на сервере, попробуйте позже</h1>
      ) : (
        rates.length > 1 && <RateList rates={rates} />
      )}
    </div>
  );
}

export default RatePage;
