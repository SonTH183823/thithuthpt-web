import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {domainUpload} from "../../configs/configs";

function AudioPlayer({link}) {
  return (
    <div className={'w-full'}>
      <ReactAudioPlayer
        src={`${domainUpload}/${link}`}
        controls
        volume={0.5}
        className={'w-full'}
      />
    </div>

  );
}

export default AudioPlayer;
