import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MdPeopleAlt } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    useGSAP(() => {
        gsap.to('.page-container', { filter: 'blur(10px)' })
        gsap.from('.login-container', { yPercent: -100, opacity: 0, duration: 0.4, ease: "back.out" })
    }, []);

    return (
        <div className="login-container md:w-1/2 md:mt-50 md:self-center p-4 bg-light-100 rounded-md shadow-2xl flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl text-center font-bold">Login</h2>
            <form id="loginForm" className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-light p-2 rounded-sm shadow-sm">
                    <input type="text" id="nama" name="user_name" placeholder="Username" className="outline-none w-9/10" />
                    <MdPeopleAlt />
                </div>
                <div className="flex justify-between items-center bg-light p-2 rounded-sm shadow-sm">
                    <input type={passwordVisible ? `text` : 'password'} id="password" name="password" placeholder="Password" className="outline-none w-9/10" />
                    <div className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}</div>
                </div>
                <button type="submit" className="w-fit pt-2 pb-2 pl-4 pr-4 bg-light self-center shadow-sm rounded-lg">Masuk</button>
            </form>
        </div>
    )
}