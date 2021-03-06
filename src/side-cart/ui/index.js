import { useEffect, useState, useCallback } from 'react';
import * as TEXT from '@partners/text';
import { showSuggestions } from '@partners/conditions';
import MainSideCartContainer from './main';
import { useCartLoading } from '../store';
import Loader from './loader';
import Suggestions from './suggestions';
import './style.css';

function SideCartContainer({ onClose }) {
  const [isLoading] = useCartLoading();
  const [cartOpen, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpen(true), 60);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => onClose(), 500);
  }, [onClose]);

  return (
    <div className={`side-cart-wrapper ${cartOpen ? 'active_link' : ''}`}>
      <div className="side-cart-overlay" onClick={handleClose}></div>
      <div className="side-cart">
        <div className="side-cart-cover">
          <div className="side-cart-container">
            <div className="side-cart-header">
              <h4>{TEXT.YOU_CART}</h4>
              <span className="side-cart-close" onClick={handleClose}>
                ✕
              </span>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <MainSideCartContainer onClose={handleClose} />
            )}
          </div>
          {showSuggestions && <Suggestions />}
        </div>
      </div>
    </div>
  );
}

export default SideCartContainer;
