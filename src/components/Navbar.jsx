import { useState } from "react";
import { MdOutlineForum } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import Login from './Login'

export default function Navbar({ showLogin, setShowLogin }) {
    const [loginText, setLoginText] = useState('Login');
    const toggleLogin = () => {
        if (loginText === 'Login') setLoginText('Tutup');
        else setLoginText('Login');
    }

    return (
        <div className="fixed w-full z-100 p-4 flex flex-col gap-4">
            <div className="flex justify-between gap-4 font-bold ">
                <div className="p-2 bg-light-100 rounded-2xl flex items-center gap-2 shadow-sm">
                    <button className="bg-light pt-2 pb-2 pl-4 pr-4 rounded-xl shadow-sm">Mading</button>
                    <button className="bg-light p-2 rounded-xl shadow-sm"><MdOutlineForum /></button>
                    <button className="bg-light p-2 rounded-xl shadow-sm"><MdReportGmailerrorred /></button>
                </div>
                <div className="p-2 bg-light-100 rounded-2xl flex justify-between items-center gap-2 shadow-sm">
                    <button className="bg-light pt-2 pb-2 pl-4 pr-4 rounded-xl shadow-sm" onClick={() => { setShowLogin(!showLogin); toggleLogin(); }}>{loginText}</button>
                </div>
            </div>
            {showLogin && <Login />}
        </div>
    );
};