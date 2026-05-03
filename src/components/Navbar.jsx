import { useState } from "react";
import { MdOutlineForum } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import gsap from "gsap";
import Mading from '../pages/Mading';
import Forum from '../pages/Forum';
import Login from './Login';

function switchPage(setPage, showLogin, setShowLogin, loginText, setLoginText, pageString, page) {
    if (pageString == page) return;
    if (loginText === 'Tutup' && showLogin === true) setLoginText('Login');
    setShowLogin(false);
    setPage(pageString);
}

function switchLogin(setShowLogin, showLogin, setLoginText, loginText) {
    const page = document.querySelector('.page-container');
    if (loginText === 'Login') {
        setLoginText('Tutup');
        page.style.pointerEvents = 'none';
        setShowLogin(true);
    }
    else {
        setLoginText('Login');
        page.style.pointerEvents = 'auto';
        gsap.to('.page-container', { filter: 'blur(0px)' })
        gsap.to('.login-container', { opacity: 0, onComplete: () => setShowLogin(false) })
    }
}

export default function Navbar({ showLogin, setShowLogin, setPageFunc, pageString, page }) {
    const [loginText, setLoginText] = useState('Login');
    const toggleLogin = () => {
        if (loginText === 'Login') setLoginText('Tutup');
        else setLoginText('Login');
    }

    return (
        <div className="fixed w-full z-100 p-4 lg:pl-12 lg:pr-12 lg:pt-6 flex flex-col gap-4 text-xs md:text-lg">
            <div className="flex justify-between gap-4 font-bold">
                <div className="p-2 bg-dark-100/25 backdrop-blur-sm rounded-2xl flex items-center gap-2 shadow-sm">
                    <button className="bg-light pt-2 pb-2 pl-4 pr-4 rounded-xl shadow-sm" onClick={() => switchPage(setPageFunc, showLogin, setShowLogin, loginText, setLoginText, 'mading', page)}>Mading</button>
                    <button className="bg-light p-2 rounded-xl shadow-sm" onClick={() => switchPage(setPageFunc, showLogin, setShowLogin, loginText, setLoginText, 'forum', page)}><MdOutlineForum /></button>
                    <button className="bg-light p-2 rounded-xl shadow-sm" onClick={() => switchPage(setPageFunc, showLogin, setShowLogin, loginText, setLoginText, 'form', page)}><IoMdSend /></button>
                </div>
                <div className="p-2 bg-dark-100/25 backdrop-blur-sm rounded-2xl flex justify-between items-center gap-2 shadow-sm">
                    <button className="bg-light pt-2 pb-2 pl-4 pr-4 rounded-xl shadow-sm" onClick={() => switchLogin(setShowLogin, showLogin, setLoginText, loginText)}>{loginText}</button>
                </div>
            </div>
            {showLogin && <Login />}
        </div>
    );
};