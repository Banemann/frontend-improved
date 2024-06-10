import styles from './GoBack.module.css';

const GoBack = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div id="GoBack" className={styles.contentBox}>
      <button onClick={goBack} className={styles.backArrow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
        </svg>
      </button>
      <p>Afbryd</p>
    </div>
  );
};

export default GoBack;
