import { NavLink, useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { loginState, userState } from '../../util/recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { PiAirplaneTakeoffFill } from 'react-icons/pi';
import { IoCalendarNumber } from 'react-icons/io5';
import { HiComputerDesktop } from 'react-icons/hi2';
import { FaDatabase } from 'react-icons/fa';
import { SiSpring } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { FaBootstrap } from 'react-icons/fa6';
import { SiDbeaver } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaCss3Alt } from 'react-icons/fa';
import { FaJava } from 'react-icons/fa';
import { GrOracle } from 'react-icons/gr';
import { FaApple } from 'react-icons/fa6';
import { BsWindows } from 'react-icons/bs';
import { SiKakao } from 'react-icons/si';
import './Footer.css'; // CSS 파일 import
import { FaGitAlt } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import { FaAws } from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';
import { FaNode } from 'react-icons/fa';
import { SiSwagger } from 'react-icons/si';
import { FaUbuntu } from 'react-icons/fa';
import { FaDocker } from 'react-icons/fa';
import { SiEclipseide } from 'react-icons/si';
import { SiAmazonec2 } from 'react-icons/si';
import { SiNginx } from 'react-icons/si';

const Footer = () => {
    const navigate = useNavigate();
    const login = useRecoilValue(loginState);
    const [, setUser] = useRecoilState(userState);

    const logout = useCallback(() => {
        setUser({ userId: '', userType: '' });
        delete axios.defaults.headers.common['Authorization'];
        window.localStorage.removeItem('refreshToken');
        window.sessionStorage.removeItem('refreshToken');
        navigate('/');
    }, [navigate, setUser]);

    return (
        <>
            {/* 푸터 */}
            <div className="container" style={{ minWidth: '400px' }}>
                <footer className="row justify-content-center py-5 my-5 border-top">
                    <div className="col-md-3 mb-3">
                        <div className="d-flex flex-column align-items-start ms-5">
                            <NavLink
                                to="/"
                                className="nav-link px-2 text-white"
                            >
                                <img
                                    src="/image/1-removebg-preview.png"
                                    style={{ width: '200px', height: 'auto' }}
                                    alt="TopGun Logo"
                                />
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <h5 className="ps-3">Developer</h5>
                        <ul className="nac flex-column">
                            <li>박준호 : 결제, SM, Deployment</li>
                            <li>정ㅇㅇ : 채팅, Publisher</li>
                            <li>김ㅇㅇ : 항공편 CRUD</li>
                            <li>이ㅇㅇ : 통합검색, Publisher</li>
                            <li>조ㅇㅇ : 회원가입, JWT</li>
                            <li>김ㅇㅇ : 공지사항 CRUD</li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3">
                        <h5>Information</h5>
                        <NavLink
                            to="mailto:pp01024689860@gmail.com?subject=문의드립니다. 제목&body=안녕하세요, 문의드립니다."
                            className="nav-link p-0 upmove-text-hover"
                        >
                            pp01024689860@gmail.com
                            <span className="icon ps-1">
                                <IoMdMail />
                            </span>
                        </NavLink>
                        <NavLink
                            to="https://github.com/parkjunho2/topgun-final.git"
                            className="nav-link p-0 upmove-text-hover"
                        >
                            Back-End Code: Github
                            <span className="icon ps-1">
                                <FaGithub />
                            </span>
                        </NavLink>
                        <NavLink
                            to="https://github.com/parkjunho2/topgun-react.git"
                            className="nav-link p-0 upmove-text-hover"
                        >
                            Front-End Code: GtiHub
                            <span className="icon ps-1">
                                <FaGithub />
                            </span>
                        </NavLink>
                        <div className="mb-1">
                            Join Period: 10/17-11/6 <IoCalendarNumber />
                        </div>
                        <div>
                            OS: Window10 MacOsM3 <BsWindows /> <FaApple />
                        </div>
                        <div>
                            DBMS: Oracle11gXE <GrOracle />{' '}
                        </div>
                        <div>
                            Langage: JDK17 <FaJava />
                        </div>
                        <div>
                            IDE: Eclipse Vscode <SiEclipseide /> <VscVscode />
                        </div>
                        <div>
                            FramWork Library: SpringBoot React <SiSpringboot />{' '}
                            <FaReact />{' '}
                        </div>
                        <div>
                            ETC Tools: <SiDbeaver /> <SiKakao /> <FaBootstrap />{' '}
                            <FaGitAlt /> <FaDiscord /> <SiAmazonec2 />{' '}
                            <SiNginx /> <FaNode /> <SiSwagger /> <FaUbuntu />{' '}
                            <FaDocker />
                        </div>
                        <div></div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <h5>Reference WebStie</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="https://www.skyscanner.co.kr/"
                                    className="nav-link p-0 text-body-secondary upmove-text-hover"
                                >
                                    <span className="icon pe-1">
                                        <PiAirplaneTakeoffFill />
                                    </span>
                                    스카이스캐너
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="https://flyasiana.com/"
                                    className="nav-link p-0 text-body-secondary upmove-text-hover"
                                >
                                    <span className="icon pe-1">
                                        <PiAirplaneTakeoffFill />
                                    </span>
                                    아시아나항공
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="https://www.jejuair.net/"
                                    className="nav-link p-0 text-body-secondary upmove-text-hover"
                                >
                                    <span className="icon pe-1">
                                        <PiAirplaneTakeoffFill />
                                    </span>
                                    제주항공
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Footer;
