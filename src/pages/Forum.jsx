import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { useMemo } from "react";
import allCardData from '../data/data.json'
import gsap from "gsap";

function DiskusiCommentCard({ comment }) {
    return (
        <div className="bg-light flex flex-col p-2 rounded-md gap-2 text-dark">
            <h3 className="font-bold">{comment.sender} / {comment.class}</h3>
            <p className="text-dark-100">{comment.text}</p>
            <div className="flex items-center gap-1"><FaRegArrowAltCircleUp />{comment.vote}</div>
        </div>
    );
};

function DiskusiDetailCard({ card }) {
    return (
        <div className="detail-card-container w-full bg-[#5C7A6B] flex flex-col gap-2 text-light p-4 rounded-lg">
            <h2 className="font-bold text-lg md:text-2xl truncate">{card.title}</h2>
            <p className="text-light-100">{card.text}</p>
            <div className="pt-2 pb-2 grid grid-cols-2 gap-4">
                {card.replies.map((reply) => (<DiskusiCommentCard comment={reply} />))}
            </div>
            <div className="flex items-center h-8 bg-light pl-2 pr-2 text-dark rounded-md">
                <input type="text" placeholder="Your Message" className="flex-1 outline-none" />
                <IoMdSend />
            </div>
            <div className="flex items-center justify-between">
                <p className="font-bold capitalize">{card.sender} / Diskusi / {card.time}</p>
                <div className="flex items-center gap-1"><FaRegArrowAltCircleUp />{card.vote}</div>
            </div>
        </div>
    );
};

function MusyawarahDetailCard({ card }) {
    let pesertaTotal = 0;
    let pesertaHadir = 0;
    card.peserta.forEach((peserta) => {
        pesertaTotal++;
        if (peserta.keterangan) pesertaHadir++;
    });
    const persentaseKehadiran = `${(pesertaHadir / pesertaTotal) * 100}%`;

    return (
        <div className="detail-card-container w-full bg-[#6B3F72] flex flex-col gap-2 text-light p-4 rounded-lg">
            <h2 className="font-bold text-lg md:text-2xl truncate">{card.title}</h2>
            <p className="text-light-100">{card.text}</p>
            <div className="pt-2 pb-2 grid grid-cols-2 gap-4">
                <div className="bg-light p-2 rounded-md text-dark flex flex-col gap-2 h-fit">
                    <h3 className="font-bold">Agenda</h3>
                    <ol className="list-decimal pl-3 text-dark-100">
                        {card.agenda.map((kegiatan) => (<li>{kegiatan}</li>))}
                    </ol>
                </div>
                <div className="bg-light rounded-md text-dark p-2 flex flex-col gap-2">
                    <h3 className="font-bold">Daftar Peserta</h3>
                    {card.peserta.map((peserta) => (
                        <div className="bg-light-100 flex gap-2 p-2">
                            <div className="rounded-full aspect-square w-8 bg-light"></div>
                            <div className="flex flex-col">
                                <p>{peserta.name}</p>
                                <p>{peserta.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center h-8 bg-[#6B3F72] brightness-110 text-light-100 rounded-md">
                <div style={{ width: persentaseKehadiran }} className="h-full bg-[#6B3F72] rounded-l-md rounded-tr-2xl p-2 flex items-center brightness-75"></div>
                <p className="pl-2 absolute">{pesertaHadir} / {pesertaTotal} Hadir</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="font-bold capitalize">{card.sender} / Musyawarah / {card.time}</p>
                <div className="flex items-center gap-1"><FaRegArrowAltCircleUp />{card.vote}</div>
            </div>
        </div>
    )
};

function DemosDetailCard({ card }) {
    let totalVote = 0;
    card.options.forEach((option) => totalVote += option.currentVotes);

    return (
        <div className="detail-card-container w-full bg-[#D4A843] flex flex-col gap-2 text-light p-4 rounded-lg">
            <h2 className="font-bold text-lg md:text-2xl truncate">{card.title}</h2>
            <p className="text-light-100">{card.text}</p>
            <div className="flex flex-col gap-2">
                {card.options.map((option) => (
                    <div className="flex items-center h-8 bg-[#D4A843] brightness-110 text-light-100 rounded-md">
                        <div style={{ width: `${(option.currentVotes / totalVote) * 100}%` }} className="h-full bg-[#D4A843] rounded-l-md rounded-tr-2xl p-2 flex items-center brightness-75"></div>
                        <p className="pl-2 absolute">{option.label}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between">
                <p className="font-bold capitalize">{card.sender} / Demos / {card.time}</p>
                <div className="flex items-center gap-1"><FaRegArrowAltCircleUp />{card.vote}</div>
            </div>

        </div>
    )
}

function DetailCard({ card }) {
    const detailCards = {
        diskusi: <DiskusiDetailCard card={card} />,
        musyawarah: <MusyawarahDetailCard card={card} />,
        demos: <DemosDetailCard card={card} />,
    }

    return detailCards[card.type];
}

function Card({ card, detailCard, setDetailCard }) {
    const bgColors = { diskusi: '#5C7A6B', laporan: '#C0392B', musyawarah: '#6B3F72', demos: '#D4A843' };

    return (
        <div style={{ backgroundColor: bgColors[card.type] }} className="forum-card-container w-full flex flex-col gap-2 text-light p-4 rounded-lg cursor-pointer" onClick={() => { if (card.type == 'laporan' || card == detailCard) return; setDetailCardFunc(setDetailCard, card) }}>
            <h2 className="font-bold text-lg md:text-2xl truncate">{card.title}</h2>
            <p className="text-light-100">{card.text}</p>
            <div className="flex items-center justify-between">
                <p className="font-bold capitalize">{card.sender} / {card.type} / {card.time}</p>
                <div className="flex items-center gap-1"><FaRegArrowAltCircleUp />{card.vote}</div>
            </div>
        </div>
    )
}

function setDetailCardFunc(setUseState, value) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    gsap.to('.detail-card-container', {
        opacity: 0,
        yPercent: 50,
        delay: 0.3,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            // 2. Setelah animasi out selesai, baru ganti state
            setUseState(value);

            // 3. Animasi In akan dipicu oleh useGSAP yang memantau [detailCard]
        }
    });
}

export default function Forum() {
    const [allData, setAllData] = useState(allCardData);
    const sortedData = useMemo(() => {
        return [...allData].sort((a, b) => b.vote - a.vote);
    }, [allData]);

    const [detailCard, setDetailCard] = useState(sortedData[0]);
    useGSAP(() => {
        const cards = gsap.utils.toArray('.forum-card-container');
        cards.forEach((card) => {
            gsap.from(card, { opacity: 0, xPercent: -50, stagger: 0.1, scrollTrigger: { trigger: card, start: 'top 95%', toggleActions: 'play none none none' } });
        })
    }, [allData])
    useGSAP(() => {
        gsap.from('.detail-card-container', { opacity: 0, yPercent: -50, duration: 0.5, ease: 'back.out' })
    }, [detailCard]);

    return (
        <div className="w-full min-h-svh bg-light pt-20 pl-4 pr-4 flex flex-col gap-4">
            <div>
                {<DetailCard key={detailCard.id} card={detailCard} />}
            </div>
            <div className="flex flex-col gap-4">
                {sortedData.map((card) => (<Card card={card} detailCard={detailCard} setDetailCard={setDetailCard} />))}
            </div>
        </div>
    )
}