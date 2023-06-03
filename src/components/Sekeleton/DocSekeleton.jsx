import React from 'react';

function DocSekeleton() {
  return (
    <div className={`md:h-[200px] h-[150px] rounded-lg flex flex-row mb-4`}>
      <div className={'animate-pulse h-full aspect-video bg-slate-200 rounded-lg'}></div>
      <div className={'flex flex-1 ml-3 flex-col space-y-4'}>
        <div className={'animate-pulse w-full bg-slate-200 h-12 rounded-md'}/>
        <div className={'animate-pulse w-full bg-slate-200 h-10 rounded-md'}/>
        <div className={'animate-pulse w-full bg-slate-200 h-16 rounded-md'}/>
      </div>
    </div>
  );
}

export default DocSekeleton;
