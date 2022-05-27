import { useEffect, useState, useCallback } from 'react';
import SideCartContainer from './ui';
import { useCartLoading, useActions } from './store';

const MainSideCart = () => {
  const [isOpen, setOpen] = useState(false);
  const [, { getCartData }] = useActions();
  const [isLoading] = useCartLoading();

  const onOpen = useCallback(() => {
    setOpen(true);
    if (!isLoading) getCartData();
    document.body.classList.add('blocked-scroll');
  }, [getCartData, isLoading]);

  const onClose = useCallback(() => {
    setOpen(false);
    document.body.classList.remove('blocked-scroll');
  }, []);

  useEffect(() => {
    document.addEventListener('open-mini-cart', onOpen);
    document.addEventListener('close-mini-cart', onClose);
  }, [onOpen, onClose]);

  if (!isOpen) return null;

  return <SideCartContainer onClose={onClose} />;
};

export default MainSideCart;
