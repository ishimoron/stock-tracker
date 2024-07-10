'use client';
import { IndicesI } from '@/app/interfaces/IndicesI';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import AlertSystem from '../AlertSystem/AlertSystem';
import styles from './styles.module.css';

const StockIndices: React.FC = () => {
  const [indices, setIndices] = useState<IndicesI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getIndicesData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/indices');
        setIndices(response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getIndicesData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div>
      <>
        <h1 className={styles.title}>Stock Indices Chart</h1>

        <ResponsiveContainer width='100%' height={500}>
          <BarChart
            data={indices}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            stackOffset='sign'
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='symbol' />
            <YAxis />
            <Tooltip
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;

                const item = payload[0].payload;

                return (
                  <div className={styles.сhartTooltip}>
                    <p className={styles.tooltip_name}>
                      <strong>{item.name}</strong>
                    </p>
                    <p className={styles.tooltip_date}>Date: {item.date}</p>
                    <p className={styles.tooltip_price}>Price: {item.price}</p>
                    <p className={styles.tooltip_hight}>
                      High price: {item.high}
                    </p>
                    <p className={styles.tooltip_low}>Low price: {item.low}</p>
                  </div>
                );
              }}
            />
            <Legend />
            <Bar dataKey='price' fill='#8884d8' name='Price' />
            <Bar dataKey='high' fill='#82ca9d' name='High price' />
            <Bar dataKey='low' fill='#db4343' name='Low price' />
          </BarChart>
        </ResponsiveContainer>

        <AlertSystem indices={indices} />
      </>
    </div>
  );
};

export default StockIndices;
