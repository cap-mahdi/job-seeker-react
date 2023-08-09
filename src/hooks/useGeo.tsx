import { useEffect, useState } from "react";

interface Geo {
  lat: number;
  lng: number;
}

function useGeo() {
  const [geo, setGeo] = useState<Geo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => setError(error.message)
    );
  }, []);

  return { geo, error };
}

export { useGeo };
