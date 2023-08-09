import { useRef } from "react";

import BottomHome from "../components/homePage/BottomHome";
import TopHome from "../components/homePage/TopHome";

function HomePage() {
  const featuresDiv = useRef<HTMLDivElement>(null);
  const scrollToFeatures = () => {
    if (featuresDiv.current != null)
      featuresDiv.current.scrollIntoView({
        behavior: "smooth",
      });
  };

  // useEffect(() => {
  //   alert(
  //     "This project is a learning project\nIt misses a lot of features\nIt is not meant to be used in production\nIt uses a fake API"
  //   );
  //   alert("see list of users you can connect with in the About Us page");
  // }, []);

  return (
    <>
      <TopHome scrollToFeatures={scrollToFeatures} />
      <BottomHome featuresDiv={featuresDiv} />
    </>
  );
}

export default HomePage;
