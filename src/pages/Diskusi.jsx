import { FaAngleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";

function Comment({ comment }) {
    return (
        <div className="bg-neutral-50 flex flex-col gap-1 p-4 rounded-lg border border-accent-100 shadow-sm relative text-dark">
            <div><p className="font-bold text-sm">{comment.sender}</p><p>{comment.class}</p></div>
            <p>{comment.text}</p>
            <div className="absolute right-4 flex gap-1 items-center"><FaRegArrowAltCircleUp />{comment.vote}</div>
        </div>
    )
}

export default function Diskusi({ card, setPageFunc }) {
    const [repliesCount, setRepliesCount] = useState(card.replies.length)

    return (
        <div className="page-container bg-light pl-4 pr-4 pb-18 pt-20 md:pt-24 lg:pl-12 lg:pr-12 lg:pt-26 text-[10px] md:text-sm">
            <div className="flex gap-2 items-center font-bold pb-4"><div className="bg-light-100 rounded-full p-2 cursor-pointer" onClick={() => setPageFunc('forum')}><FaAngleLeft /></div><span className="text-sm">Detail Diskusi</span></div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="flex flex-col gap-4 flex-1">
                    <div className="bg-[#5C7A6B] p-4 rounded-lg flex flex-col gap-2 text-light">
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
                        <p className="pl-4 pr-4 text-sm md:text-xl flex gap-2 items-center bg-[#5C7A6B] text-light rounded-lg font-bold"><FaRegArrowAltCircleUp /> Suarakan</p>
                    </div>
                    <div className="fixed lg:static bottom-4 z-100 p-2 flex bg-dark-100/25 items-center text-sm rounded-xl border border-accent-100 left-4 right-4 lg:left-12 lg:right-12 backdrop-blur-sm">
                        <input type="text" className="flex-1 outline-none" />
                        <IoMdSend />
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <p className="text-sm font-bold text-dark-100">{repliesCount} Komentar</p>
                    {card.replies.map((reply) => <Comment comment={reply} />)}
                </div>
            </div>
        </div>
    )
}