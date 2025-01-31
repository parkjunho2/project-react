import { useState, useEffect } from "react";

const Lottery = () => {
  const [lottoNumbers, setLottoNumbers] = useState([]);
  const [lottoData, setLottoData] = useState(null);

  useEffect(() => {
    fetchLottoData();
  }, []);

  const fetchLottoData = async () => {
    try {
      const response = await fetch("https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=1");

      // 응답 상태가 200이 아닐 경우 처리
      if (!response.ok) {
        throw new Error('네트워크 응답이 실패했습니다.');
      }

      const data = await response.json();
      console.log("로또 데이터 응답:", data); // 응답 확인

      // 로또 데이터 처리
      setLottoData({
        drawNumber: data.drwNo,
        date: data.drwNoDate,
        numbers: [
          data.drwtNo1,
          data.drwtNo2,
          data.drwtNo3,
          data.drwtNo4,
          data.drwtNo5,
          data.drwtNo6,
        ],
        bonus: data.bnusNo,
        firstWinAmount: data.firstWinamnt,
        totalSales: data.totSellamnt,
        firstWinnerCount: data.firstPrzwnerCo,
      });
    } catch (error) {
      console.error("로또 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const generateLottoNumbers = () => {
    let numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    setLottoNumbers([...numbers].sort((a, b) => a - b));
  };

  return (
    <>
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-4">로또 번호 생성기</h2>
        <button
          onClick={generateLottoNumbers}
          className="btn btn-success"
        >
          번호 생성
        </button>
        <div className="mt-4 text-lg font-semibold">
          {lottoNumbers.length > 0 && (
            <p className="btn btn-primary">당첨 번호: {lottoNumbers.join(", ")}</p>
          )}
        </div>
      </div>

      <hr />

      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-4">로또 당첨 번호 (회차 1)</h2>
        {lottoData ? (
          <div className="mb-4">
            <p>회차: {lottoData.drawNumber}</p>
            <p>날짜: {lottoData.date}</p>
            <p>당첨 번호: {lottoData.numbers.join(", ")}</p>
            <p>보너스 번호: {lottoData.bonus}</p>
            <p>1등 당첨금: {lottoData.firstWinAmount}원</p>
            <p>총 판매 금액: {lottoData.totalSales}원</p>
            <p>1등 당첨자 수: {lottoData.firstWinnerCount}명</p>
          </div>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </>
  );
};

export default Lottery;