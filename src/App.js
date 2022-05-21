import { useEffect, useState } from 'react';
import SideCart from './side-cart';
import './App.css';

function App() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener(
      'open-mini-cart',
      () => {
        setOpen(true);
      },
      [],
    );
    document.addEventListener(
      'close-mini-cart',
      () => {
        setOpen(false);
      },
      [],
    );
  }, []);
  return <SideCart isOpen={isOpen} onClose={() => setOpen(false)} />;
}

export default App;
