'use client';
import React, { useState } from 'react';
import MobileMenu from './MobileMenu';

const MobileMenuButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    // const screen = document.getElementsByTagName('body')[0];
    // screen.classList.toggle('overflow-hidden');
  };

  return (
    <>
      <button
        className="bgsecondary flex h-[36px] w-[36px] flex-col items-center justify-center gap-y-[3px] rounded-full  hover:scale-[1.03] active:bg-secondary"
        onClick={handleMenuToggle}
      >
        <div className="w-[19px] border-b-2 border-zinc-900" />
        <div className="my-[1px] w-[19px] border-b-2 border-zinc-900" />
        <div className="w-[19px] border-b-2 border-zinc-900" />
      </button>
      <MobileMenu isOpen={menuOpen} close={handleMenuToggle} />
    </>
  );
};

export default MobileMenuButton;
