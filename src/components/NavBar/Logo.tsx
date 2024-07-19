import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className="bg-p3y-red relative shadow-md">
        <div className="absolute w-full h-full translate-x-[8px] bg-p3y-blue -translate-y-[6px] shadow-md" />
        <span className="text-p3y-gunmetal text-[29px] tracking-[0px] leading-none dark:text-p3y-grey border-[1px] border-p3y-gunmetal dark:border-p3y-grey px-[5px] pb-[6px] pt-[3px]  dark:bg-p3y-gunmetal bg-p3y-grey anta cursor-pointer -translate-y-[3px] translate-x-[4px] z-20 flex shadow-md">
          p3y
        </span>
      </div>
    </Link>
  );
};

export default Logo;
