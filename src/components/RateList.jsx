import styles from './scss/rate.module.scss';
import RateItem from './RateItem';

function RateList({ rates, isDates = false }) {
  return (
    <div className={styles.ratelist}>
      <div
        className={
          isDates
            ? styles.row + ' ' + styles.ratelist__header + ' ' + styles.dates
            : styles.row + ' ' + styles.ratelist__header
        }
      >
        {isDates && (
          <div className={styles.row__wrapper}>
            <p className={styles.row__item}>Дата</p>
          </div>
        )}

        <div className={styles.row__wrapper}>
          <p className={styles.row__item}>Код валюты</p>
        </div>

        <div className={styles.row__wrapper}>
          <p className={styles.row__item}>Значение в рублях</p>
        </div>

        <div className={styles.row__wrapper}>
          <p className={styles.row__item}>Разница в процентах</p>
        </div>
      </div>

      {isDates
        ? rates.map(rate => (
            <RateItem rate={rate} isDates={true} key={rate.Date} />
          ))
        : rates.map(rate => <RateItem rate={rate} key={rate.ID} />)}
    </div>
  );
}

export default RateList;
