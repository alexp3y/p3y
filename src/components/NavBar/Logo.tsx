import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className="bg-p3y-red relative">
        <div className="absolute w-full h-full translate-x-[6px] bg-p3y-blue -translate-y-[6px]" />
        <span className="text-p3y-gunmetal text-[30px] tracking-[0px] leading-none dark:text-p3y-red border-[2px] border-p3y-gunmetal dark:border-p3y-grey px-[4px] pb-[6px] pt-[2px]  dark:bg-p3y-gunmetal bg-p3y-grey anta cursor-pointer -translate-y-[3px] translate-x-[3px] z-20 flex">
          p3y
        </span>
      </div>
    </Link>
  );
};

export default Logo;
