import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Login() {
    useGSAP(() => {
        gsap.from('.login-container', { yPercent: -100, opacity: 0, duration: 0.4, ease: "back.out" })
    }, []);

    return (
        <div className="login-container h-100 bg-light-100 rounded-md shadow-lg"></div>
    )
}