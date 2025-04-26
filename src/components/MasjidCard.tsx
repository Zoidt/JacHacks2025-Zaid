import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

interface Props {
  masjid: Doc<"masjids">;
  isFavorite: boolean;
}

export function MasjidCard({ masjid, isFavorite }: Props) {
  const [expanded, setExpanded] = useState(false);
  const toggleFavorite = useMutation(api.masjids.toggleFavorite);

  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', { hour12: false });
  
  const prayers = [
    { name: 'Fajr', time: masjid.prayerTimes.fajr },
    { name: 'Dhuhr', time: masjid.prayerTimes.dhuhr },
    { name: 'Asr', time: masjid.prayerTimes.asr },
    { name: 'Maghrib', time: masjid.prayerTimes.maghrib },
    { name: 'Isha', time: masjid.prayerTimes.isha },
  ];

  const currentPrayer = prayers.reduce((prev, curr) => {
    return currentTime >= curr.time ? curr : prev;
  }, prayers[0]);

  const nextPrayer = prayers[
    (prayers.findIndex(p => p.name === currentPrayer.name) + 1) % prayers.length
  ];

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
      style={{ viewTransitionName: `masjid-${masjid._id}` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{masjid.name}</h3>
          <p className="text-sm text-slate-500">{masjid.address}</p>
        </div>
        <button
          onClick={() => toggleFavorite({ masjidId: masjid._id })}
          className="text-2xl"
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-emerald-50 rounded">
          <span className="font-medium text-emerald-700">Current: {currentPrayer.name}</span>
          <span className="text-emerald-600">{currentPrayer.time}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
          <span className="font-medium text-slate-700">Next: {nextPrayer.name}</span>
          <span className="text-slate-600">{nextPrayer.time}</span>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-sm text-emerald-600 hover:text-emerald-700"
      >
        {expanded ? "Show less" : "Show all times"}
      </button>

      {expanded && (
        <div className="mt-4 space-y-2 border-t pt-4">
          {Object.entries(masjid.prayerTimes).map(([prayer, time]) => (
            <div key={prayer} className="flex justify-between items-center">
              <span className="capitalize text-slate-700">{prayer}</span>
              <span className="text-slate-600">{time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
