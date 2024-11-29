import React, { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Exchange = () => {
  const [exchangeRates, setExchangeRates] = useState({ inr: null, krw: null });
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const fromCurrency = 'usd';

  const getExchangeRates = useCallback(async () => {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
    try {
      const response = await axios.get(url, {
        headers: {
          // Authorization 헤더를 명시적으로 제거
          Authorization: undefined, // 또는 삭제
        },
      });

      const data = response.data;
      if (data[fromCurrency]) {
        setExchangeRates({
          inr: data[fromCurrency]['inr'],
          krw: data[fromCurrency]['krw'],
        });
      } else {
        console.error("환율 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("환율 조회 중 오류 발생:", error);
    }
  }, []);

  const getCurrencies = useCallback(async () => {
    const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCurrencies(data);
    } catch (error) {
      console.error("통화 목록을 가져오는 중 오류 발생:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getExchangeRates(), getCurrencies()]);
    };

    fetchData();
  }, [getExchangeRates, getCurrencies]);

  return (
    <div>
      {exchangeRates.inr && exchangeRates.krw ? (
        <>
          <h1>{`1 ${fromCurrency.toUpperCase()}는 ${exchangeRates.inr} INR입니다.`}</h1>
          <h1>{`1 ${fromCurrency.toUpperCase()}는 ${exchangeRates.krw} KRW입니다.`}</h1>
        </>
      ) : (
        <p>환율을 가져오는 중입니다...</p>
      )}

      <h1>모든 통화 목록</h1>
      <ul>
        {Object.entries(currencies).map(([code, name]) => (
          <li key={code}>{`${code}: ${name}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Exchange;
