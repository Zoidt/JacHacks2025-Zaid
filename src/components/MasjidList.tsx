import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MasjidCard } from "./MasjidCard";

export function MasjidList() {
  const masjids = useQuery(api.masjids.list) || [];
  const favorites = useQuery(api.masjids.getFavorites) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {masjids.map((masjid) => (
        <MasjidCard
          key={masjid._id}
          masjid={masjid}
          isFavorite={favorites.includes(masjid._id)}
        />
      ))}
    </div>
  );
}
