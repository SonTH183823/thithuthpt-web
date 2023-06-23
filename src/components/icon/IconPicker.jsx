import React, {useEffect, useState} from 'react';
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme
} from "emoji-picker-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmile} from "@fortawesome/free-solid-svg-icons";
import {Popover} from "react-tiny-popover";

function IconPicker({onSelectedIcon, isContent = false, height, width, isRounded = true}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const togglePicker = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  function onClick(emojiData, event) {
    onSelectedIcon(emojiData.emoji)
  }

  return (
    <div className={'flex items-center justify-center'}>
      {
        isContent ?
          <div id={'popover-layout'}
               className={`icon-picker ${isRounded ? '!rounded-[8px]' : 'not-rounded !rounded-none'} w-fit h-fit`}>
            <EmojiPicker
              onEmojiClick={onClick}
              autoFocusSearch={false}
              theme={Theme.LIGHT}
              searchPlaceHolder={'Tìm kiếm emoji'}
              width={width || 350}
              height={height || 450}
              emojiVersion="0.6"
              lazyLoadEmojis={true}
              previewConfig={{
                showPreview: false
              }}
              defaultSkinTone={SkinTones.MEDIUM}
              emojiStyle={EmojiStyle.APPLE}
            />
          </div>
          :
          <Popover
            isOpen={isPopoverOpen}
            positions={['top', 'bottom', 'left', 'right']}
            reposition={true}
            containerClassName={'z-[9999999] rounded-md'}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={
              <div id={'popover-layout'} tabIndex={0} className="icon-picker is-shadow rounded-[8px] w-fit h-fit"
                   style={{boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)'}}>
                <EmojiPicker
                  onEmojiClick={onClick}
                  autoFocusSearch={false}
                  theme={Theme.LIGHT}
                  searchPlaceHolder={'Tìm kiếm emoji'}
                  width={width || 350}
                  height={height || 450}
                  emojiVersion="0.6"
                  lazyLoadEmojis={true}
                  previewConfig={{
                    showPreview: false
                  }}
                  defaultSkinTone={SkinTones.MEDIUM}
                  emojiStyle={EmojiStyle.APPLE}
                />
              </div>
            }>
            <label tabIndex={0} className="cursor-pointer" onClick={togglePicker}>
              <FontAwesomeIcon icon={faSmile} className={'text-primary'}/>
            </label>
          </Popover>
      }
    </div>

  );
}

export default IconPicker;
