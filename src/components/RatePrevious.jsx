import { useEffect, useState, useContext } from 'react';
import cross from '../media/svg/cross.svg';
import styles from './scss/rateprevious.module.scss';
import { fetcher } from '../fetch/fetch';
import RateList from './RateList';
import Loader from './Loader';
import { visibleContext, lockContext } from '../context';

function RatePrevious({ charCode, name, setVisible }) {
  const [loading, setLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const [dates, setDates] = useState([]);
  const [wrongRates, setWrongRates] = useState([]);
  const [rates, setRates] = useState([]);
  const { setIsOpenModal } = useContext(visibleContext);
  const { setIsLock } = useContext(lockContext);

  useEffect(async () => {
    let i;
    for (i = 0; i <= 10; i++) {
      const date = new Date(Date.now() - 86400000 * i)
        .toISOString()
        .split('T')[0]
        .replace(/-/g, '/');
      const url = 'archive/' + date + '/daily_json.js';
      await fetcher(url, setWrongRates);
    }
    setIsDataReady(true);
  }, []);

  useEffect(() => {
    if (wrongRates.Date) {
      setDates([...dates, wrongRates.Date.split('T')[0]]);
    }

    for (let rate in wrongRates.Valute) {
      if (rate === charCode) {
        setRates([...rates, wrongRates.Valute[rate]]);
      }
    }
  }, [wrongRates]);

  useEffect(() => {
    if (isDataReady) {
      let i;
      for (i = 0; i < rates.length; i++) {
        rates[i].Date = dates[i];
      }
      setLoading(false);
    }
  }, [isDataReady]);

  const removeModal = () => {
    setVisible(false);
    setIsOpenModal(false);
    setIsLock(false);
  };
  return (
    <div className={styles.modal + ' ' + styles._active} onClick={removeModal}>
      <img
        onClick={removeModal}
        className={styles.modal__cross}
        src={cross}
        alt="cross"
      />
      <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
        <h2>{name} курс за предыдущие 10 дней</h2>
        {loading ? <Loader /> : <RateList rates={rates} isDates={true} />}
      </div>
    </div>
  );
}

export default RatePrevious;
