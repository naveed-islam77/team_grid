self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Football Alert ⚽️";
  const options = {
    body: data.body || "Goal scored in your match!",
    icon: "/logos/league_1.png",
    badge: "/logos/team_3.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/league/564/matches")
  );
});