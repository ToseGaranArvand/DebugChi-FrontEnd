// public/sw.js
self.addEventListener("push", function (event) {
    const data = event.data.json();
    const title = data.title || "Notification";
    const options = {
      body: data.body,
      icon: "/icon.png"
    };
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });