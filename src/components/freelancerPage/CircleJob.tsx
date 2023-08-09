import { Popup } from "react-leaflet/Popup";
import { CircleMarker } from "react-leaflet/CircleMarker";
import { Marker } from "react-leaflet/Marker";
import { useJobs } from "../../contexts/JobContext";
import { getColor } from "./getColor";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import { Job } from "../../Types";

interface props {
  job: Job;
  marker?: boolean;
}

interface childProps {
  children: React.ReactNode;
}

function CircleJob({
  job: { id, location, title, skills },
  marker = false,
}: props) {
  const { hoveredJob, selectedJob, setIsLoading } = useJobs();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { percentage, color } = getColor(skills, user);

  const Container: React.FC<childProps> = ({ children }) =>
    selectedJob?.id !== id && !marker ? (
      <CircleMarker
        center={[location.lat, location.lng]}
        pathOptions={{ color }}
        radius={hoveredJob?.id === id ? 25 : 20}
        eventHandlers={{
          click: () => {
            setIsLoading(true);
            navigate(`/jobs?id=${id}`);
          },
        }}
      >
        {children}
      </CircleMarker>
    ) : (
      <Marker position={[location.lat, location.lng]}>{children}</Marker>
    );
  return (
    <Container>
      <Popup>
        <h3>{title}</h3>
        <p>Matched skills: {percentage}%</p>
      </Popup>
    </Container>
  );
}

export default CircleJob;
