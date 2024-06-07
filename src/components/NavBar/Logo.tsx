import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <span className="text-[34px] tracking-tighter text-p3y-red border-2 border-p3y-red rounded-[3px] px-[6px] pt-0 pb-[3px] dark:bg-p3y-gunmetal bg-p3y-ivory anta cursor-pointer active:border-p3y-blue active:text-p3y-blue dark:active:border-p3y-maize dark:active:text-p3y-maize">
        p3y
      </span>
    </Link>
  );
};

export default Logo;
