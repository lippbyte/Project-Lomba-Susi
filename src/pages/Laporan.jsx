import { FaAngleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";

export default function Laporan({ card, setPage }) {
    return (
        <div className="bg-light pl-4 pr-4 pb-18 pt-20 md:pt-24 lg:pl-12 lg:pr-12 lg:pt-26 text-[10px] md:text-sm">
            <div className="flex gap-2 items-center font-bold pb-4"><div className="bg-light-100 rounded-full p-2 cursor-pointer" onClick={() => setPage('forum')}><FaAngleLeft /></div><span className="text-sm">Detail Laporan</span></div>
            <div className="flex flex-col gap-4">
                <div className="bg-[#C0392B] p-4 rounded-lg flex flex-col gap-2 text-light">
                    <div className="bg-neutral-100 pt-1 pb-1 pl-2 pr-2 brightness-95 rounded-lg capitalize w-fit text-accent font-bold">{card.category}</div>
                    <h2 className="font-bold text-sm md:text-xl truncate">{card.title}</h2>
                    <p className="text-light-100">{card.text}</p>
                    <p className="font-bold capitalize">{card.sender} · {card.class} · {card.type} · {card.time}</p>
                </div>
                <div className="bg-neutral-50 p-4 border border-accent-100 rounded-lg flex justify-between shadow-sm">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl md:text-2xl">{card.vote}</h2>
                        <p>Suara</p>
                    </div>
                    <p className="pl-4 pr-4 text-sm md:text-xl flex gap-2 items-center bg-[#C0392B] text-light rounded-lg font-bold"><FaRegArrowAltCircleUp /> Suarakan</p>
                </div>
            </div>
        </div>
    )
}