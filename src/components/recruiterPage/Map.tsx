import styles from "./Map.module.css";
import { Marker } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Popup } from "react-leaflet/Popup";
import { useEffect } from "react";
import { useGeo } from "../../hooks/useGeo";
import { useMap } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import { LatLngTuple } from "leaflet";

interface Props {
  setPosition: (position: [number, number]) => void;
  position: LatLngTuple;
}

const DEFAULT_POSITION: LatLngTuple = [32.0853, 34.7818];
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
      <ChangeMapToCurrentPosition setPosition={setPosition} />
      <ClickingOnMap setPosition={setPosition} />
    </MapContainer>
  );
}

interface ChildProps {
  setPosition: (position: [number, number]) => void;
}

function ClickingOnMap({ setPosition }: ChildProps) {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function ChangeMapToCurrentPosition({ setPosition }: ChildProps) {
  const map = useMap();
  /*get location*/
  const { geo } = useGeo();
  useEffect(() => {
    if (geo) {
      map.flyTo([geo.lat, geo.lng], ZOOM_TO_CURRENT_LOCATION);
      setPosition([geo.lat, geo.lng]);
    }
  }, [geo, map, setPosition]);
  return null;
}

export default Map;
