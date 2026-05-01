import { FaAngleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";

export default function Demos({ card, setPage }) {
    let voteTotal = 0;
    const maxVotes = Math.max(...card.options.map(o => o.currentVotes));
    card.options.forEach((option) => voteTotal += option.currentVotes);

    return (
        <div className="page-container bg-light pl-4 pr-4 pb-18 pt-20 md:pt-24 lg:pl-12 lg:pr-12 lg:pt-26 text-[10px] md:text-sm">
            <div className="flex gap-2 items-center font-bold pb-4"><div className="bg-light-100 rounded-full p-2 cursor-pointer" onClick={() => setPage('forum')}><FaAngleLeft /></div><span className="text-sm">Detail Demos</span></div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="flex flex-col gap-4 flex-1">
                    <div className="bg-[#d4a843] p-4 rounded-lg flex flex-col gap-2 text-light">
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
                        <p className="pl-4 pr-4 text-sm md:text-xl flex gap-2 items-center bg-[#d4a843] text-light rounded-lg font-bold"><FaRegArrowAltCircleUp /> Suarakan</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <p className="text-sm font-bold text-dark-100">Peserta</p>
                    {card.options.map((option) => (
                        <div className="bg-neutral-50 p-4 border border-accent-100 rounded-lg flex flex-col shadow-sm gap-2">
                            <div className="w-full flex justify-between items-center">
                                <p className="text-sm font-bold">{option.label}</p>
                                <p className="text-dark-100">{Math.floor((option.currentVotes / voteTotal) * 100)}%</p>
                            </div>
                            <div className="bg-light-100 w-full h-2 rounded-2xl relative">
                                <div style={{ width: `${(option.currentVotes / voteTotal) * 100}%`, backgroundColor: option.currentVotes == maxVotes ? '#3b6d11' : '#d4a843' }} className="absolute h-full rounded-2xl"></div>
                            </div>
                            <p className="text-dark-100">{option.currentVotes} Suara</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}