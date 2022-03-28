import { useState, useEffect } from 'react';
import { visibleContext, lockContext } from './context/index';
import RatePage from './pages/RatePage';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLock, setIsLock] = useState(false);

  useEffect(() => {
    isLock
      ? document.body.classList.add('_lock')
      : document.body.classList.remove('_lock');
  }, [isLock]);
  return (
    <visibleContext.Provider value={{ isOpenModal, setIsOpenModal }}>
      <lockContext.Provider value={{ isLock, setIsLock }}>
        <div className="app">
          <RatePage />
        </div>
      </lockContext.Provider>
    </visibleContext.Provider>
  );
}

export default App;
