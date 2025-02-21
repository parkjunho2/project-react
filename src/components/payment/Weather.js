import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [currWeather, setCurrWeather] = useState(null);
  const [weatherCodes, setWeatherCodes] = useState([]); // Add weather codes state
  const [dateRange, setDateRange] = useState([null, null]);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWeatherData = useCallback(async () => {
    const latitude = 37.5665;
    const longitude = 126.978;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&daily=weathercode&timezone=Asia%2FSeoul`;

    try {
      const response = await axios.get(url, {
        headers: {
          // Authorization 헤더를 명시적으로 제거
          Authorization: undefined, // 또는 삭제
        },
      });
      const data = response.data;
      if (data.current_weather) {
        setCurrWeather(data.current_weather);
      } else {
        console.error("현재 날씨 데이터가 없습니다.");
      }

      const [startDate, endDate] = dateRange;
      if (startDate && endDate) {
        const formattedStartDate = moment(startDate).utcOffset(9).format('YYYY-MM-DD');
        const formattedEndDate = moment(endDate).utcOffset(9).format('YYYY-MM-DD');
        const forecastUrl = `${url}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

        const forecastResponse = await axios.get(forecastUrl);
        const forecastData = forecastResponse.data;
        if (forecastData.hourly) {
          setWeather(forecastData.hourly);
          // Setting daily weather codes
          const dailyWeatherCodes = forecastData.daily.weathercode.map((code, index) => ({
            date: moment(forecastData.daily.time[index]).format('YYYY-MM-DD'),
            weatherCode: code,
          }));
          setWeatherCodes(dailyWeatherCodes);
        } else {
          console.error("날씨 데이터가 없습니다.");
        }
      }
    } catch (error) {
      console.error("날씨 조회 중 오류 발생:", error);
    }
  }, [dateRange]);

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
      getWeatherData()
  }, [dateRange, getWeatherData]);

  const calculateAverageTemperatures = (weatherData) => {
    const dates = Array.from(new Set(weatherData.time.map(time => moment(time).format('YYYY-MM-DD'))));
    return dates.map(date => {
      const dailyTemperatures = weatherData.time
        .map((time, index) => (moment(time).format('YYYY-MM-DD') === date ? weatherData.temperature_2m[index] : null))
        .filter(temp => temp !== null);

      const dailyWeatherCode = weatherCodes.find(code => code.date === date)?.weatherCode || '정보 없음';

      const avgTemperature = dailyTemperatures.reduce((a, b) => a + b, 0) / dailyTemperatures.length || 0;

      return {
        date,
        avgTemperature: avgTemperature.toFixed(2),
        weatherCode: dailyWeatherCode,
      };
    });
  };

  return (
    <div>
      {currWeather ? (
        <>
          <h2>{`현재 서울의 기온은 ${currWeather.temperature}°C입니다.`}</h2>
          <p>{`측정 시간: ${new Date(currWeather.time).toLocaleString()} (UTC)`}</p>
        </>
      ) : (<h1>불러오는중</h1>
      )}

      <h2>날짜 선택</h2>
      <div>
        <label>날짜 범위 선택: </label>
        <DatePicker
          selectsRange={true}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={(update) => setDateRange(update)}
          isClearable={true}
        />
      </div>

      {weather ? (
        <div>
          <h2>서울의 시간별 기온 평균</h2>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>날짜</th>
                <th>평균 온도 (°C)</th>
                <th>날씨 코드</th>
              </tr>
            </thead>
            <tbody>
              {calculateAverageTemperatures(weather).map(({ date, avgTemperature, weatherCode }) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{avgTemperature}</td>
                  <td>{weatherCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>날씨를 가져오는 중입니다...</p>
      )}

    </div>
  );
};

export default Weather;
