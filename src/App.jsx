import Navbar from './components/Navbar';
import Mading from './pages/Mading';
import Forum from './pages/Forum';
import Diskusi from './pages/Diskusi';
import Musyawarah from './pages/Musyawarah';
import Demos from './pages/Demos';
import Laporan from './pages/Laporan';
import Form from './pages/Form';
import gsap from 'gsap';
import AllData from './data/data.json';
import { useState, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(Draggable, ScrollTrigger);

function App() {
  const [allData, setAllData] = useState(AllData);
  const [showLogin, setShowLogin] = useState(false);
  const [overflow, setOverflow] = useState('hidden');
  const [page, setPage] = useState('mading');
  const [cardData, setCardData] = useState(null);
  const pageMapping = {
    mading: <Mading />,
    forum: <Forum setPage={setPage} setCardData={setCardData} />,
    diskusi: <Diskusi card={cardData} setPage={setPage} />,
    musyawarah: <Musyawarah card={cardData} setPage={setPage} />,
    demos: <Demos card={cardData} setPage={setPage} />,
    laporan: <Laporan card={cardData} setPage={setPage} />,
    form: <Form />
  }

  useGSAP(() => {
    const madingContainer = document.querySelector('#mading-container');
    if (madingContainer) {
      setOverflow('hidden');
      gsap.set('#mading-container', { x: -(madingContainer.offsetWidth / 2 - window.innerWidth / 2), y: -(madingContainer.offsetHeight / 2 - window.innerHeight / 2) });
      const draggables = Draggable.create(madingContainer, { bounds: 'body' });
      gsap.from('.card-container', { scale: 2, delay: 0.15 });
      gsap.from('.card-container', { rotate: 0, stagger: 0.15 });
      return () => {
        draggables.forEach(d => d.kill());
      };
    } else {
      setOverflow('visible');
    }
  }, [page]);

  return (
    <div style={{ overflow: overflow }} className="w-full h-svh bg-light">
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} setPage={setPage} page={page} />
      {pageMapping[page]}
      {/* <Form /> */}
    </div>
  );
};

export default App;