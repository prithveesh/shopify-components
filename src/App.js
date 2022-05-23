import { useEffect, useState } from 'react';
import SideCart from './side-cart';
import './App.css';

function App() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('open-mini-cart', () => {
      onOpen();
    });
    document.addEventListener('close-mini-cart', () => {
      onClose();
    });
  }, []);

  const onOpen = () => {
    setOpen(true);
    document.body.classList.add('blocked-scroll');
  };

  const onClose = () => {
    setOpen(false);
    document.body.classList.remove('blocked-scroll');
  };

  return <SideCart isOpen={isOpen} onClose={onClose} />;
}

export default App;
