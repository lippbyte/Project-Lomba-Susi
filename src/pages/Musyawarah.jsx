import { FaAngleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";

export default function Musyawarah({ card, setPage }) {
    return (
        <div className="bg-light pl-4 pr-4 pb-18 pt-20 md:pt-24 lg:pl-12 lg:pr-12 lg:pt-26 text-[10px] md:text-sm">
            <div className="flex gap-2 items-center font-bold pb-4"><div className="bg-light-100 rounded-full p-2 cursor-pointer" onClick={() => setPage('forum')}><FaAngleLeft /></div><span className="text-sm">Detail Musyawarah</span></div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="flex flex-col gap-4 flex-1">
                    <div className="bg-[#6b3f72] p-4 rounded-lg flex flex-col gap-2 text-light">
                        <div className="flex gap-2">
                            <div className="bg-neutral-100 pt-1 pb-1 pl-2 pr-2 brightness-95 rounded-lg capitalize w-fit text-accent font-bold">{card.category}</div>
                            {card.status ? (
                                <div className="bg-[#eaf3de] pt-1 pb-1 pl-2 pr-2 brightness-95 rounded-lg capitalize w-fit text-[#3b6d11] font-bold">Selesai</div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <h2 className="font-bold text-sm md:text-xl truncate">{card.title}</h2>
                        <p className="text-light-100">{card.text}</p>
                        <p className="font-bold capitalize">{card.sender} · {card.class} · {card.type} · {card.time}</p>
                    </div>
                    <div className="bg-neutral-50 p-4 border border-accent-100 rounded-lg flex justify-between shadow-sm">
                        <div className="flex flex-col">
                            <h2 className="font-bold text-xl md:text-2xl">{card.vote}</h2>
                            <p>Suara</p>
                        </div>
                        <p className="pl-4 pr-4 text-sm md:text-xl flex gap-2 items-center bg-[#6b3f72] text-light rounded-lg font-bold"><FaRegArrowAltCircleUp /> Suarakan</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <p className="text-sm font-bold text-dark-100">Agenda</p>
                    <div className="bg-neutral-50 p-4 flex flex-col rounded-lg border border-accent-100 shadow-sm gap-2">
                        {card.agenda.map((agenda, index) => (
                            <div className="flex gap-3 items-center">
                                <p className="p-2 h-7.5 md:h-8.5 w-7.5 md:w-8.5 text-center rounded-full font-bold text-light bg-[#6b3f72]">{index + 1}</p>
                                <p className="text-sm">{agenda}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold text-dark-100">Peserta</p>
                    <div className="bg-neutral-50 p-4 rounded-lg shadow-sm border border-accent-100 flex flex-col gap-2">
                        {card.peserta.map((peserta, index) => (
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm">{peserta.name}</p>
                                    <p className="text-sm text-dark-100">{peserta.role}</p>
                                </div>
                                <p style={{ backgroundColor: peserta.keterangan ? '#eaf3de' : '#fcebeb', color: peserta.keterangan ? '#3b6d11' : '#791f1f' }} className="text-sm pl-2 pr-2 pt-1 pb-1 rounded-xl border border-accent-100">{peserta.keterangan ? 'Hadir' : 'Tidak Hadir'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}