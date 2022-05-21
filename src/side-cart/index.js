import { useState, useEffect, useCallback } from 'react';
import { MiniCartStore } from './store';
import SideCartContainer from './ui';

function SideCart({ onClose, isOpen }) {
  const [cartOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) setOpen(true);
  }, [isOpen]);
  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => onClose(), 500);
  }, [onClose]);

  return (
    <MiniCartStore>
      {isOpen && <SideCartContainer onClose={handleClose} isOpen={cartOpen} />}
    </MiniCartStore>
  );
}

export default SideCart;
