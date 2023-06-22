import React, {useEffect, useState} from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-toastify";

const ModalShare = (id, title) => {
  const [shareUrl, setShareUrl] = useState(null);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (window) {
      setShareUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (copied) {
      const modal = document.getElementById("modal-share-id");
      if (modal) {
        modal.click();
      }
      toast.success("Đã sao chép!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [copied]);
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle"/>
      <label htmlFor={id} className="modal cursor-pointer" id="modal-share-id">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Chia sẻ bài thi qua</h3>
          <div className="flex items-center space-x-3">
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={32} round/>
            </FacebookShareButton>

            <EmailShareButton url={shareUrl} subject={title} body="body">
              <EmailIcon size={32} round/>
            </EmailShareButton>

            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round/>
            </TwitterShareButton>

            <TelegramShareButton url={shareUrl} title={title}>
              <TelegramIcon size={32} round/>
            </TelegramShareButton>
          </div>
          <h3 className="text-lg font-bold">Hoặc sao chép liên kết</h3>
          <div className="flex items-center justify-between bg-gray-200 rounded-lg">
            <div className="p-3 flex-1">
              <span className="line-clamp-1 sm:text-base text-sm"> {shareUrl}</span>
            </div>
            <div className="w-fit">
              <CopyToClipboard
                text={shareUrl}
                onCopy={() => {
                  setCopied(true);
                }}
              >
                <div
                  className="btn max-w-[100px] w-full bg-primary sm:text-base text-xs sm:px-3 px-1 rounded-lg normal-case text-white hover:bg-primary hover:border-primary border-primary">
                  Sao chép
                </div>
              </CopyToClipboard>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalShare;
