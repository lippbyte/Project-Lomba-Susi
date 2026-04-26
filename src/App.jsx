import Navbar from './components/Navbar';
import Mading from './pages/Mading';
import Forum from './pages/Forum';
import gsap from 'gsap';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/all';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const madingContainer = document.querySelector('#mading-container');
  const overflow = madingContainer ? 'hidden' : 'visible';

  gsap.registerPlugin(Draggable);
  useGSAP(() => {
    if (madingContainer != null) {
      gsap.set('#mading-container', { x: -(madingContainer.offsetWidth / 2 - window.innerWidth / 2), y: -(madingContainer.offsetHeight / 2 - window.innerHeight / 2) });
      Draggable.create(madingContainer, { bounds: 'body' });
    }

    gsap.from('.card-container', { scale: 2, delay: 0.3 });
    gsap.from('.card-container', { rotate: 0, stagger: 0.2 });
  }, []);

  return (
    <div style={{ overflow: overflow }} className="w-svw h-svh bg-light text-xs md:text-lg">
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
      {/* <Mading /> */}
      <Forum />
    </div>
  );
};

export default App;