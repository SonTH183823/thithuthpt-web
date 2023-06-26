self.addEventListener("push", function (e) {
  data = e.data.json();
  var options = {
    body: data.notification.body,
    icon: "https://res.cloudinary.com/dlqzy1i0o/image/upload/v1687752287/icon1_wpq15w.png",
    data,
  };
  e.waitUntil(
    (async () => {
      await self.registration.showNotification(
        data.notification.title,
        options
      );
      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
      });
      if (clients && clients.length) {
        for (let c of clients) {
          c.postMessage(options);
        }
      }
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
