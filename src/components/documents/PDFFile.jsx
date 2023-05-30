import React, {useState} from 'react';

function PDFFile() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  return (
    <div className={''}>
      <iframe src={'https://drive.google.com/file/d/1cMU7TMTzFFEZXWSRPvqSEK-qy2VrY4bV/preview'} className={'w-full h-[500px] md:h-[800px]'}/>
    </div>
  );
}

export default PDFFile;
