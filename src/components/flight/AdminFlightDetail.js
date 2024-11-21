import { Navigate, useNavigate, useParams } from "react-router";
import { useEffect, useCallback, useState } from 'react';
import axios from "axios";

const AdminFlightDetail = () => {
    const { flightId } = useParams(); 
    const navigate = useNavigate();
    const [flight, setFlight] = useState(null);
    const [load, setLoad] = useState(false); 

    useEffect(() => {
        loadFlight();
    }, []);

    const loadFlight = useCallback(async () => {
        try {
            const resp = await axios.get(`/flight/${flightId}`);
            setFlight(resp.data);
        } catch (e) {
            setFlight(null);
        }
        setLoad(true);
    }, [flightId]);

    const updateFlight = useCallback(async (status) => {

         // 이미 처리된 상태인지 확인
    if (flight.flightStatus === "승인" || flight.flightStatus === "거절") {
        alert("이 항공편은 이미 처리되었습니다.");
        return;
    }

    
        if (status === "승인" && !window.confirm("승인 후 변경 불가합니다. 승인 처리하시겠습니까?")) return;
        if (status === "거절" && !window.confirm("거절 처리하시겠습니까?")) return;

        const updatedFlight = {
            ...flight,
            flightStatus: status,
        };


        await axios.put("/admin/update", updatedFlight);
        navigate("/admin/list");
    }, [flight, navigate]);

    if (load === false) { 
        return (
            <div className="container mt-4">
                <h1>항공편 상세 정보</h1>
                <div className="row">
                        <div className="col-sm-3">
                            <span className="placeholder col-6"></span>
                        </div>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-secondary placeholder col-2">목록보기</button>
                </div>
            </div>
        );
    }

    if (flight === null) {
        return <Navigate to="/notFound" />;
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">항공편 상세정보</h1>
            <div className="card p-4 shadow">
                <div className="row mb-3">
                    <div className="col-sm-4"><strong>항공편 번호:</strong>{flight.flightNumber}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4"><strong>출발 시간:</strong>
                    {new Date(flight.departureTime).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </div>

                </div>
                <div className="row mb-3">
                    <div className="col-sm-4"><strong>도착 시간:</strong>
                    {new Date(flight.arrivalTime).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4"><strong>출발 공항:</strong>{flight.departureAirport}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4"><strong>도착 공항:</strong>{flight.arrivalAirport}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4"><strong>가격:</strong>
                    {Number(flight.flightPrice).toLocaleString()}원
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4"><strong>항공사 ID:</strong>{flight.userId}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4"><strong>상태:</strong>
                    <span className="text-dark bg-warning border border-warning p-1 rounded">{flight.flightStatus}</span>
                    </div>
                </div>
            </div>

            {/* 버튼들 */}
            <div className="text-center mt-4">
                {/* 상태 값에 따른 버튼 */}
                {flight.flightStatus === "대기" && (
                    <>
                        <button className="btn btn-success" onClick={() => updateFlight(flight.flightId, "승인")}>승인</button>
                        <button className="btn btn-danger" onClick={() => updateFlight(flight.flightId, "거절")}>거절</button>
                    </>
                )}
                {flight.flightStatus === "승인" && (
                    <button className="btn btn-secondary" disabled>승인됨</button>
                )}
                {flight.flightStatus === "거절" && (
                    <button className="btn btn-secondary" disabled>거절됨</button>
                )}
                <button className="btn btn-secondary ms-2" onClick={() => navigate("/admin/list")}>목록보기</button>
            </div>
        </div>
    );
};

export default AdminFlightDetail;
