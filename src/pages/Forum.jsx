import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

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
        <div className="w-full bg-[#5C7A6B] flex flex-col gap-2 text-light p-4 rounded-lg">
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
                <p className="font-bold">{card.sender} / Diskusi / {card.time}</p>
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
        <div className="w-full bg-[#6B3F72] flex flex-col gap-2 text-light p-4 rounded-lg">
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
            <div className="flex items-center h-8 bg-light text-dark rounded-md">
                <div style={{ width: persentaseKehadiran }} className="h-full bg-[#6B3F72] rounded-l-md rounded-tr-2xl p-2 flex items-center brightness-150 text-light"><p>{pesertaHadir} / {pesertaTotal} Hadir</p></div>
            </div>
            <div className="flex items-center justify-between">
                <p className="font-bold">{card.sender} / Musyawarah / {card.time}</p>
                <div className="flex items-center gap-1"><FaRegArrowAltCircleUp />{card.vote}</div>
            </div>
        </div>
    )
}

const forumData = [
    {
        id: 1,
        type: 'diskusi',
        title: 'Kebersihan Lingkungan Sekolah',
        text: 'Bagaimana pendapat kalian mengenai jadwal piket baru yang akan diterapkan mulai minggu depan?',
        sender: 'Andi Perkasa',
        class: 'XII-IPA-1',
        vote: 150,
        time: '12:40',
        replies: [
            {
                id: 101,
                sender: 'Budi Utomo',
                class: 'XII-IPS-2',
                text: 'Saya setuju, asalkan pembagian waktunya adil untuk yang ekskul.',
                vote: 12
            },
            {
                id: 102,
                sender: 'Siti Aminah',
                class: 'XI-IPA-3',
                text: 'Mungkin bisa ditambah poin untuk yang paling rajin?',
                vote: 45
            }
        ]
    }
];

const musyawarahData = [
    {
        id: 2,
        type: 'musyawarah',
        title: 'Rapat Evaluasi Ekstrakurikuler',
        text: 'Pembahasan mengenai efektivitas kegiatan setelah jam sekolah.',
        sender: 'OSIS',
        vote: 100,
        time: '14:00',
        agenda: [
            'Pembukaan oleh kepala sekolah.',
            'Membahas kepentingan kegiatan ekstrakurikuler.',
            'Sesi voting pendapat.',
            'Pembulatan keputusan.'
        ],
        peserta: [
            { name: 'Andi', role: 'Ketua', keterangan: true },
            { name: 'Budi', role: 'Sekretaris', keterangan: true },
            { name: 'Siti', role: 'Bendahara', keterangan: false }
        ],
    }
]

export default function Forum() {
    return (
        <div className="w-svw h-svh bg-light pt-20 pl-4 pr-4 flex flex-col gap-4">
            <div>
                <MusyawarahDetailCard card={musyawarahData[0]} />
            </div>
        </div>
    )
}