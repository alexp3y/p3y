import React from 'react';

function ColorfluControlsMenuKey({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-14 aspect-square border border-p3y-gunmetal rounded-lg flex justify-center items-center bg-p3y-gunmetal bg-opacity-70 text-p3y-ivory">
      {children}
    </div>
  );
}

export default ColorfluControlsMenuKey;
