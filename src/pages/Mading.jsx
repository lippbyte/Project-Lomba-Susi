import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useMemo } from "react";
import Pin from '../components/Pin'

function Card({ type, title, text, sender, vote }) {
    let bgColor;
    switch (type) {
        case 'forum': bgColor = '#5C7A6B'; break;
        case 'laporan': bgColor = '#C0392B'; break;
        case 'musyawarah': bgColor = '#6B3F72'; break;
        case 'demos': bgColor = '#D4A843'; break;
    };
    const { rotation, randomAlign, width, randomMargin } = useMemo(() => {
        const angle = Math.floor(Math.random() * 6) + 1;
        const aligns = ['flex-start', 'center', 'flex-end'];
        return {
            rotation: Math.random() > 0.5 ? angle : -angle,
            randomAlign: aligns[Math.floor(Math.random() * aligns.length)],
            width: 160 * Math.min(1 + (vote / 100), 1.5),
            randomMargin: {
                marginTop: `${Math.floor(Math.random() * 25)}px`,
                marginBottom: `${Math.floor(Math.random() * 25)}px`,
                marginLeft: `${Math.floor(Math.random() * 25)}px`,
                marginRight: `${Math.floor(Math.random() * 25)}px`,
            }
        };
    }, []);

    return (
        <div style={{ backgroundColor: bgColor, width: `${width}px`, rotate: `${rotation}deg`, alignSelf: randomAlign, ...randomMargin }} className='card-container aspect-square flex flex-col bg-primary rounded-xl shadow-2xl p-3 text-light cursor-pointer gap-1'>
            <h2 className="font-bold text-lg truncate">{title}</h2>
            <p className="text-light-100 line-clamp-3">{text}</p>
            <div className="flex justify-between items-center mt-auto">
                <div className="font-bold">
                    <p className="capitalize">{type}</p>
                    <p>- {sender}</p>
                </div>
                <div className="self-end flex items-center gap-2 hover:brightness-200">
                    <FaRegArrowAltCircleUp />
                    <p>{vote}</p>
                </div>
            </div>
            <div className="pin-container absolute -top-2 -right-2 scale-125">
                <Pin />
            </div>
        </div>
    );
};

const cards = [
    { id: 1, type: 'forum', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 10 },
    { id: 2, type: 'laporan', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 1 },
    { id: 3, type: 'laporan', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 15 },
    { id: 4, type: 'forum', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 30 },
    { id: 5, type: 'demos', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 50 },
    { id: 6, type: 'musyawarah', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 7 },
    { id: 7, type: 'musyawarah', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 4 },
    { id: 8, type: 'musyawarah', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 8 },
    { id: 9, type: 'demos', title: 'Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', sender: 'Sender', vote: 18 },
];

export default function Mading() {
    return (
        <div id="mading-container" style={{ backgroundImage: `linear-gradient(to right, #cccccc 1px, transparent 1px), linear-gradient(to bottom, #cccccc 1px, transparent 1px)`, backgroundSize: "40px 40px" }} className="w-[200svw] h-[200svh] bg-light flex flex-col justify-center items-center">
            <div className="flex flex-wrap justify-center items-start gap-4">
                {cards.map((card) => (<Card key={card.id} type={card.type} title={card.title} text={card.text} sender={card.sender} vote={card.vote} />))}
            </div>
        </div>
    );
};