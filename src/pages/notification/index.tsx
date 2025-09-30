import { useEffect } from "react";

export default function Home() {
  const askPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      alert("Notification permission granted ✅");
    } else {
      alert("Permission denied ❌");
    }
  };

  const sendNotification = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification("⚽️ Goal!", {
        body: "Barcelona just scored a goal!",
        icon: "/icons/icon-192x192.png",
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Push Notification Practice</h1>
      <button
        onClick={askPermission}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Enable Notifications
      </button>

      <div className="p-8">
        <h1 className="text-xl font-bold">Push Notification Practice</h1>
        <button
          onClick={sendNotification}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Send Static Notification
        </button>
      </div>
    </div>
  );
}
