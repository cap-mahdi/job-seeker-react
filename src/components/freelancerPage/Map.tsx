import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";

import { useGeo } from "../../hooks/useGeo";
import { useMap } from "react-leaflet";
// import { useMapEvents } from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect } from "react";
import { useJobs } from "../../contexts/JobContext";
import CircleJob from "./CircleJob";
import { useSearchParams } from "react-router-dom";
// import { useNavigate } from "react-router";

const ZOOM = 7;
const ZOOM_TO_CURRENT_LOCATION = 10;
const DEFAULT_POSITION = [51.505, -0.09];
function Map() {
  const { jobs, selectedJob } = useJobs();
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
      {jobs.map((job) => (
        <CircleJob key={job.id} job={job} />
      ))}
      {jobs.length == 0 && selectedJob && (
        <CircleJob job={selectedJob} marker={true} />
      )}
      <ChnageMapToCurrentPosition />
      <ChangeToSelectedJob />
      {/* <ClickingOnMap /> */}
    </MapContainer>
  );
}
function ChangeToSelectedJob() {
  const { selectedJob } = useJobs();
  const map = useMap();
  useEffect(() => {
    if (selectedJob) {
      map.flyTo(
        [selectedJob.location.lat, selectedJob.location.lng],
        ZOOM_TO_CURRENT_LOCATION
      );
    }
  }, [selectedJob, map]);
}

function ChnageMapToCurrentPosition() {
  const map = useMap();
  /*get location*/
  const { geo } = useGeo();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    if (id) return;
    if (geo) {
      map.flyTo([geo.lat, geo.lng], ZOOM_TO_CURRENT_LOCATION);
    }
  }, [geo, map]);
}

// function ClickingOnMap() {
//   const { selectedJob } = useJobs();
//   const navigate = useNavigate();

//   const map = useMapEvents({
//     click: () => {
//       if (selectedJob) navigate(-1);
//     },
//     drag: () => {
//       if (selectedJob) navigate(-1);
//     },
//   });
// }
export default Map;
