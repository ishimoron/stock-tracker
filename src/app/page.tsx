'use client';
import StockIndices from './components/StockIndices/StockIndices';
import User from './components/User/User';

export default function Home() {
  return (
    <main>
      <User />
      <StockIndices />
    </main>
  );
}

Home.requireAuth = true;
