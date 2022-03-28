import { useState, useContext } from 'react';
import styles from './scss/rate.module.scss';
import RatePrevious from './RatePrevious';
import { visibleContext, lockContext } from '../context/index';

function RateItem({ rate, isDates = false }) {
  const [visible, setVisible] = useState(false);
  const { isOpenModal, setIsOpenModal } = useContext(visibleContext);
  const { setIsLock } = useContext(lockContext);

  const createModal = () => {
    !isOpenModal && setVisible(true);
    setIsOpenModal(true);
    setIsLock(true);
  };

  return visible ? (
    <RatePrevious
      charCode={rate.CharCode}
      name={rate.Name}
      setVisible={setVisible}
    />
  ) : (
    <div
      className={isDates ? styles.row + ' ' + styles.dates : styles.row}
      onClick={createModal}
    >
      {isDates && (
        <div className={styles.row__wrapper}>
          <div className={styles.row__item + ' ' + styles.row__charcode}>
            {rate.Date}
            <span className={styles.tooltip__text}>{rate.Name}</span>
          </div>
        </div>
      )}

      <div className={styles.row__wrapper}>
        <div className={styles.row__item + ' ' + styles.row__charcode}>
          {rate.CharCode}
          <span className={styles.tooltip__text}>{rate.Name}</span>
        </div>
      </div>
      <div className={styles.row__wrapper}>
        <div className={styles.row__item}>
          {rate.Value}
          <span className={styles.tooltip__text}>{rate.Name}</span>
        </div>
      </div>
      <div className={styles.row__wrapper}>
        <div className={styles.row__item}>
          {((100 * (rate.Value - rate.Previous)) / rate.Previous).toFixed(3)}%
          <span className={styles.tooltip__text}>{rate.Name}</span>
        </div>
      </div>
    </div>
  );
}

export default RateItem;
