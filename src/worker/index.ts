/*
 * This is a custom service worker for push notifications.
 * The service worker (sw) listens for push events and displays a notification.
 * When the notification is clicked, the service worker redirects the user to the notification URL.
 * It also listens for the sw to install and runs a skipWaiting() to activate the new sw.
 */

/// <reference lib="WebWorker" />

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", (event) => {
  const data = JSON.parse(event.data?.text() ?? '{ title: "" }');
  const urlToOpen = new URL(data.redirectLink, self.location.origin).href;

  const notificationOptions: NotificationOptions = {
    body: data.body,
    icon: "/logo/logo_512.png",
    data: {
      url: urlToOpen,
    },
  };
  event.waitUntil(
    self.registration.showNotification(data.title, notificationOptions),
  );
});

self.addEventListener("notificationclick", (e) => {
  // Close the notification popout
  e.notification.close();

  // Get all the Window clients
  e.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientsArr) => {
      // Find the client that matches the notification URL
      const matchingClient = clientsArr.find(
        (windowClient) => windowClient.url === e.notification.data.url,
      );

      if (matchingClient) {
        // Focus the matching client
        return matchingClient.focus();
      } else if (clientsArr.length > 0) {
        // Redirect the first client to the notification URL and focus it
        clientsArr[0]
          .navigate(e.notification.data.url)
          .then((windowClient) => windowClient && windowClient.focus());
      } else {
        // If no clients are open, open a new window to the notification URL
        self.clients
          .openWindow(e.notification.data.url)
          .then((windowClient) => windowClient && windowClient.focus());
      }
    }),
  );
});

self.addEventListener("install", () => {
  self.skipWaiting();
});

export type {};
