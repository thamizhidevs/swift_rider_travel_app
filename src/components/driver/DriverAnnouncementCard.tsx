
import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function DriverAnnouncementCard() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;
  return (
    <div className="relative bg-gradient-to-r from-purple-light via-white to-purple/10 border-l-4 border-purple p-4 rounded-lg shadow mb-6 flex items-center animate-fade-in">
      <Bell className="w-6 h-6 text-purple mr-3" />
      <div>
        <p className="text-sm text-gray-800 font-semibold">Announcement:</p>
        <p className="text-sm text-gray-700">
          SwiftRide will deploy new driver bonus incentives next week! Check your Earnings tab soon.
        </p>
      </div>
      <button
        title="Dismiss"
        className="absolute top-2 right-2 text-purple hover:text-purple-dark transition"
        onClick={() => setVisible(false)}
      >
        ×
      </button>
    </div>
  );
}
