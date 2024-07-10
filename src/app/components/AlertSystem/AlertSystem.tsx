import { IndicesI } from '@/app/interfaces/IndicesI';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from './style.module.css';

interface AlertSystemProps {
  indices: IndicesI[];
}

const AlertSystem: React.FC<AlertSystemProps> = ({ indices }) => {
  const [aboveThreshold, setAboveThreshold] = useState('');
  const [belowThreshold, setBelowThreshold] = useState('');
  const [index, setIndex] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleSaveThresholds = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/setThresholds',
        {
          index,
          aboveThreshold,
          belowThreshold,
          email: session?.user?.email,
        }
      );

      if (response.status) {
        setShowAlert((alert) => !alert);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Set Price Thresholds</h2>
        <div className={styles.form__control}>
          <div className={styles.form__control}>
            <label>Choose Index</label>
          </div>

          <select
            onChange={(e) => setIndex(e.target.value)}
            className={styles.form__field}
          >
            <option>Choose index</option>
            {indices.map((item) => (
              <option value={item.symbol} key={item.symbol}>
                {item.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.form__control}>
          <div className={styles.form__control}>
            <label>Above Threshold:</label>
          </div>

          <input
            type='number'
            value={aboveThreshold}
            onChange={(e) => setAboveThreshold(e.target.value)}
            className={styles.form__field}
          />
        </div>
        <div>
          <label>Below Threshold:</label>
          <input
            type='number'
            value={belowThreshold}
            onChange={(e) => setBelowThreshold(e.target.value)}
            className={styles.form__field}
          />
        </div>
        <button onClick={handleSaveThresholds} className={styles.form__button}>
          Save Thresholds
        </button>

        <div>
          {showAlert && (
            <div className={styles.alert}>
              Thank you you will notified if price will change
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;
