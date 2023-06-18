import React, {useState, useEffect} from 'react';

function CountDown({mis}) {
  const [time, setTime] = useState(mis * 60 || 130);
  const [isRed, setRed] = useState(false)
  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 120) setRed(true)
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);
  return (
    <div className={'flex text-primary font-bold text-5xl w-full justify-center pb-4 select-none'}>
            <span
              className={'bg-backgroundPrimary flex p-4 w-fit rounded-xl ' + `${isRed ? `!bg-[#fde2e2] text-[#f56c6c]` : ''}`}>
                {`${Math.floor(time / 60)}`.padStart(2, 0)}
            </span>
      <div className={'py-4 font-bold flex flex-col justify-evenly mx-2 '}>
        <div className={'w-2 h-2 rounded-full bg-primary ' + `${isRed ? `!bg-[#f56c6c]` : ''}`}/>
        <div className={'w-2 h-2 rounded-full bg-primary ' + `${isRed ? `!bg-[#f56c6c]` : ''}`}/>
      </div>
      <span
        className={'bg-backgroundPrimary flex p-4 w-fit rounded-xl ' + `${isRed ? `!bg-[#fde2e2] text-[#f56c6c]` : ''}`}>
                {`${time % 60}`.padStart(2, 0)}
            </span>
    </div>
  );
}

export default CountDown;
