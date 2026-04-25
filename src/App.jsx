import Navbar from './components/Navbar';
import Mading from './pages/Mading';
import gsap from 'gsap';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/all';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  gsap.registerPlugin(Draggable);
  useGSAP(() => {
    const madingContainer = document.querySelector('#mading-container');

    gsap.set('#mading-container', { x: -(madingContainer.offsetWidth / 2 - window.innerWidth / 2), y: -(madingContainer.offsetHeight / 2 - window.innerHeight / 2) });

    gsap.from('.card-container', { scale: 2, delay: 0.3 });
    gsap.from('.card-container', { rotate: 0, stagger: 0.2 });

    Draggable.create('#mading-container', { bounds: 'body' });
  }, []);

  return (
    <div className="w-svw h-svh bg-light text-xs overflow-hidden">
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
      <Mading />
    </div>
  );
};

export default App;