import { useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function Form() {
    const [type, setType] = useState('diskusi');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [agenda, setAgenda] = useState(['']);
    const [peserta, setPeserta] = useState([{ name: '', role: '', keterangan: false }]);
    const bgColorMapping = {
        diskusi: '#5C7A6B',
        musyawarah: '#6B3F72',
        demos: '#D4A843',
        laporan: '#C0392B',
    };
    const addAgenda = () => {
        let newAgenda = [...agenda, ''];
        setAgenda(newAgenda);
    };
    const subAgenda = () => {
        if (agenda.length == 1) return;
        let newAgenda = [...agenda];
        newAgenda.pop();
        setAgenda(newAgenda);
    };
    const setAgendaItem = (index, value) => {
        let newAgenda = [...agenda];
        newAgenda[index] = value;
        setAgenda(newAgenda);
    };
    const addPeserta = () => {
        let newPeserta = [...peserta, { name: '', role: '', keterangan: false }];
        setPeserta(newPeserta);
    };
    const subPeserta = () => {
        if (peserta.length == 1) return;
        let newPeserta = [...peserta];
        newPeserta.pop();
        setPeserta(newPeserta);
    };
    const setPesertaNameItem = (index, value) => {
        let newPeserta = [...peserta];
        newPeserta[index].name = value;
        setPeserta(newPeserta);
        console.log(peserta);
    }
    const setPesertaRoleItem = (index, value) => {
        let newPeserta = [...peserta];
        newPeserta[index].role = value;
        setPeserta(newPeserta);
        console.log(peserta);
    }
    const setPesertaKetItem = (index, value) => {
        let newPeserta = [...peserta];
        newPeserta[index].keterangan = !newPeserta[index].keterangan;
        setPeserta(newPeserta);
        console.log(peserta);
    }

    return (
        <div className="page-container pl-4 pr-4 pb-4 pt-20 md:pt-24 lg:pl-12 lg:pr-12 lg:pt-26 text-[10px] md:text-sm bg-light">
            <div className="flex flex-col gap-2 pb-4">
                <h1 className="text-2xl lg:text-4xl font-bold">Form Unggahan</h1>
                <p className="pb-2">Buat unggahan anda di sini</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="flex flex-col gap-4 p-4 bg-neutral-50 border border-accent-100 rounded-lg shadow-sm text-light flex-1">
                    <div className="flex flex-col gap-2">
                        <p className="text-dark-100 text-sm font-bold">Tipe Unggahan</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div role="button" style={{ backgroundColor: type == 'diskusi' ? '#5C7A6B' : '#ddd8cb', color: type == 'diskusi' ? '#eeeae0' : '#2c2c2a' }} className="p-2 bg-light-100 rounded-md text-center text-sm font-bold text-light border border-accent-100" onClick={() => setType('diskusi')}>Diskusi</div>
                            <div role="button" style={{ backgroundColor: type == 'musyawarah' ? '#6B3F72' : '#ddd8cb', color: type == 'musyawarah' ? '#eeeae0' : '#2c2c2a' }} className="p-2 bg-light-100 rounded-md text-center text-sm font-bold text-light border border-accent-100" onClick={() => setType('musyawarah')}>Musyawarah</div>
                            <div role="button" style={{ backgroundColor: type == 'demos' ? '#D4A843' : '#ddd8cb', color: type == 'demos' ? '#eeeae0' : '#2c2c2a' }} className="p-2 bg-light-100 rounded-md text-center text-sm font-bold text-light border border-accent-100" onClick={() => setType('demos')}>Demos</div>
                            <div role="button" style={{ backgroundColor: type == 'laporan' ? '#C0392B' : '#ddd8cb', color: type == 'laporan' ? '#eeeae0' : '#2c2c2a' }} className="p-2 bg-light-100 rounded-md text-center text-sm font-bold text-light border border-accent-100" onClick={() => setType('laporan')}>Laporan</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-dark-100 text-sm font-bold">Judul</p>
                        <input type="text" placeholder="Tulis judul yang menarik…" style={{ backgroundColor: bgColorMapping[type] }} className="rounded-lg text-sm p-2 outline-none" onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-dark-100 text-sm font-bold">Kategori</p>
                        <input type="text" placeholder="Gunakan kategori yang cocok…" style={{ backgroundColor: bgColorMapping[type] }} className="rounded-lg text-sm p-2 outline-none" onChange={(event) => setCategory(event.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-dark-100 text-sm font-bold">Isi Unggahan</p>
                        <textarea type="text" rows={3} maxLength={300} placeholder="Ceritakan lebih lanjut…" style={{ backgroundColor: bgColorMapping[type] }} className="rounded-lg text-sm p-2 outline-none" onChange={(event) => setText(event.target.value)} />
                        <p className="text-dark-100 font-bold self-end">{text.length}/300</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    {type == 'musyawarah' && (
                        <div className="flex flex-col gap-4 p-4 bg-neutral-50 border border-accent-100 rounded-lg shadow-sm text-light">
                            <div className="flex flex-col gap-2">
                                <p className="text-dark-100 text-sm font-bold flex items-center justify-between">Agenda<span className="flex gap-2"><IoIosAddCircleOutline onClick={() => { addAgenda() }} /><IoIosRemoveCircleOutline onClick={() => { subAgenda() }} /></span></p>
                                {agenda.map((agenda, index) => (
                                    <input type="text" key={index} placeholder={`Tulis agenda ke-${index + 1}`} style={{ backgroundColor: bgColorMapping[type] }} className="rounded-lg text-sm p-2 outline-none" onChange={(event) => { setAgendaItem(index, event.target.value) }} />
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-dark-100 text-sm font-bold flex items-center justify-between">Peserta<span className="flex gap-2"><IoIosAddCircleOutline onClick={() => { addPeserta() }} /><IoIosRemoveCircleOutline onClick={() => { subPeserta() }} /></span></p>
                                {peserta.map((peserta, index) => (
                                    <div key={index} className="grid grid-cols-3 gap-2 items-center">
                                        <input type="text" placeholder='Nama' style={{ backgroundColor: bgColorMapping[type] }} className="rounded-lg text-sm p-2 outline-none flex-1" onChange={(event) => { setPesertaNameItem(index, event.target.value) }} />
                                        <input type="text" placeholder='Peran' style={{ backgroundColor: bgColorMapping[type] }} className="rounded-lg text-sm p-2 outline-none flex-1" onChange={(event) => { setPesertaRoleItem(index, event.target.value) }} />
                                        <p style={{ backgroundColor: peserta.keterangan ? '#eaf3de' : '#fcebeb', color: peserta.keterangan ? '#3b6d11' : '#791f1f' }} className="text-sm pl-2 pr-2 h-full flex items-center justify-center rounded-xl border border-accent-100" onClick={(event) => { setPesertaKetItem(index, event.target.value) }}>{peserta.keterangan ? 'Hadir' : 'Tidak Hadir'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div style={{ backgroundColor: bgColorMapping[type] }} className="p-4 rounded-lg border border-accent-100 shadow-sm text-light flex flex-col gap-2 relative">
                        <h2 className="font-bold text-sm md:text-xl truncate">{title ? title : 'Judul'}</h2>
                        <h2 className="absolute right-4 text-light-100 opacity-50">Pratinjau</h2>
                        <p className="text-light-100">{text ? text : 'Isi Unggahan'}</p>
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-bold capitalize text-light">Nama Anda · {type} · 07:00</p>
                            <div className="flex items-center gap-2"><FaRegArrowAltCircleUp />100<div className="bg-neutral-100 pt-1 pb-1 pl-2 pr-2 brightness-95 rounded-lg capitalize text-accent border border-accent-100 font-bold">{category ? category : 'Kategori'}</div></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="pl-4 pr-4 pt-2 pb-2 text-sm font-bold bg-[#fcebeb] text-[#791f1f] rounded-lg border border-accent-100">Reset</button>
                        <button className="pl-4 pr-4 pt-2 pb-2 text-sm font-bold bg-[#eaf3de] text-[#3b6d11] rounded-lg border border-accent-100">Kirim</button>
                    </div>
                </div>
            </div>
        </div>
    )
}