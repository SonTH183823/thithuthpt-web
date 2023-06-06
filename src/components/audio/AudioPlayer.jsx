import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

function AudioPlayer(props) {
  return (
    <div className={'w-full'}>
      <ReactAudioPlayer
        src={'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3'}
        controls
        volume
        className={'w-full'}
      />
    </div>

  );
}

export default AudioPlayer;
