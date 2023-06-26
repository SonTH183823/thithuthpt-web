import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";
import * as React from "react";
import {useState} from "react";
import {useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationITem from "./NotificationItem";
import {notificationAPI} from "../../apis/notification";

export default function Notification(props) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const getNumberNotificationUnViewed = async () => {
    const totalRes = await notificationAPI.getTotalNotificationUnViewed();
    if (totalRes.total) {
      setTotal(totalRes.total);
    }
  };
  const getAllNotification = async (p) => {
    try {
      const res = await notificationAPI.getNotifications({page: p, perPage: limit});
      if (res.data.length) {
        setNotifications(res.data);
        if (res.data.length === res.total) {
          setHasMore(false);
        }
      } else {
        setNotifications([]);
        setHasMore(false);
      }
    } catch (e) {
      console.log(e);
      setHasMore(false);
    }
  };

  useEffect(() => {
    getNumberNotificationUnViewed();
  }, []);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", async (e) => {
        try {
          getNumberNotificationUnViewed();
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, []);

  const getMoreNotification = async () => {
    try {
      const res = await notificationAPI.getNotifications({
        page: page + 1,
        perPage: limit
      });
      setPage(page + 1);
      if (res.data.length) {
        setNotifications([...notifications, ...res.data]);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.log(e);
      setHasMore(false);
    }
  };
  const markAllViewed = async () => {
    try {
      await notificationAPI.markAllViewed();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Menu
      offsetY={10}
      onMenuChange={(e) => {
        setOpen(e.open)
        if (e.open) {
          setTotal(0);
          getAllNotification(1);
          markAllViewed();
        }
      }}
      menuButton={
        <MenuButton className={"relative"}>
          <i className={`fa-sharp fa-solid fa-bell text-lg ${open ? 'text-primary' : 'text-colorIconMenu'}`}></i>
          {total > 0 && (
            <div
              className="absolute -top-1 -right-5 bg-red-500 text-white rounded-full text-xs h-[20px] w-[20px] flex items-center justify-center">
              {total < 10 ? total : "9+"}
            </div>
          )}
        </MenuButton>
      }
      transition
    >
      <div
        className="w-[350px] max-h-[75vh] overflow-auto px-2 bg-base-100"
        id={"scroll-notification"}
      >
        <h3 className="m-0 px-[10px] text-info">Thông báo</h3>
        {notifications.length > 0 ? (
          <InfiniteScroll
            dataLength={notifications.length}
            next={getMoreNotification}
            hasMore={hasMore}
            endMessage={
              <div className="text-sm font-normal text-center">
                Đã tải hết thông báo.
              </div>
            }
            scrollableTarget={"scroll-notification"}
            loader={<span>Đang tải...</span>}
          >
            {notifications.map((notification) => (
              <NotificationITem
                notification={notification}
                key={notification._id}
              />
            ))}
            {/*<NotificationITem/>*/}
            {/*<NotificationITem/>*/}
          </InfiniteScroll>
        ) : (
          <div className="font-normal text-sm py-4 text-center">
            Chưa có thông báo nào!
          </div>
        )}
      </div>
    </Menu>
  );
}
