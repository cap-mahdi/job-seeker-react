import styles from "./Map.module.css";
import { Marker } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Popup } from "react-leaflet/Popup";
import { useEffect } from "react";
import { useGeo } from "../../hooks/useGeo";
import { useMap } from "react-leaflet";
import { useMapEvents } from "react-leaflet";

interface Props {
  setPosition: (position: [number, number]) => void;
  position: [number, number];
}
const DEFAULT_POSITION = [51.505, -0.09];

const ZOOM = 7;
const ZOOM_TO_CURRENT_LOCATION = 10;
function Map({ setPosition, position }: Props) {
  return (
    <MapContainer
      className={styles.container}
      center={DEFAULT_POSITION}
      zoom={ZOOM}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          The position of the marker is {position[0]}, {position[1]}
        </Popup>
      </Marker>
      <ChnageMapToCurrentPosition setPosition={setPosition} />
      <ClickingOnMap setPosition={setPosition} />
    </MapContainer>
  );
}

function ClickingOnMap({ setPosition }) {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
}

function ChnageMapToCurrentPosition({ setPosition }) {
  const map = useMap();
  /*get location*/
  const { geo } = useGeo();
  useEffect(() => {
    if (geo) {
      map.flyTo([geo.lat, geo.lng], ZOOM_TO_CURRENT_LOCATION);
      setPosition([geo.lat, geo.lng]);
    }
  }, [geo, map, setPosition]);
}

export default Map;
