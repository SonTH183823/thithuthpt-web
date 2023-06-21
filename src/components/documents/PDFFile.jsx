import React, {useEffect, useState} from 'react';

function PDFFile({fileLink}) {
  const [link, setLink] = useState('')

  useEffect(() => {
    if (fileLink.includes('/view')) {
      const string = fileLink.split('/view')[0]
      setLink(string + '/preview')
    }
  }, [fileLink])


  return (
    <div className={'text-center min-h-[240px] flex justify-center items-center'}>
      {link ? <iframe src={link}
                      className={'w-full h-[500px] md:h-[800px]'}/> : <span className={'text-red-400'}>Không thể tải tài liệu!</span>}
    </div>
  );
}

export default PDFFile;
