import { FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

export function AddMasjidForm({ onClose }: Props) {
  const addMasjid = useMutation(api.masjids.add);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    prayerTimes: {
      fajr: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: "",
      jummah: "",
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await addMasjid(formData);
      toast.success("Masjid added successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to add masjid");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-4">Add New Masjid</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData.prayerTimes).map(([prayer, time]) => (
              <div key={prayer}>
                <label className="block text-sm font-medium text-slate-700 capitalize">
                  {prayer}
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      prayerTimes: {
                        ...formData.prayerTimes,
                        [prayer]: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
        >
          Add Masjid
        </button>
      </div>
    </form>
  );
}
