import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className="bg-p3y-red rounded-[3px]">
        <span className="text-[30px] tracking-[0px] leading-none text-p3y-red border-[2px] border-p3y-red rounded-[3px] px-[4px] pb-[6px] pt-[2px]  dark:bg-p3y-gunmetal bg-p3y-ivory anta cursor-pointer -translate-y-[4px] translate-x-[4px] dark:translate-x-[3px] dark:-translate-y-[3px] z-20 flex">
          p3y
        </span>
      </div>
    </Link>
  );
};

export default Logo;
