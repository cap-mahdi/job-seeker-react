import React from "react";
import styles from "./AppFeature.module.css";
import { Reveal } from "./Reveal";

interface Props {
  feature: {
    description: string[];
    image: string;
  };
  index: number;
}

const AppFeature: React.FC<Props> = ({ feature, index }) => {
  return (
    <Reveal left={index % 2 == 1}>
      <li className={styles.feature}>
        {index % 2 == 0 && (
          <img
            src={`/assets/features/${feature.image}`}
            alt={feature.image.split(".")[0]}
          />
        )}
        <h3>
          {feature.description.map((desc, index) => (
            <span key={index}>{desc}</span>
          ))}
        </h3>
        {index % 2 == 1 && (
          <img
            src={`/assets/features/${feature.image}`}
            alt={feature.image.split(".")[0]}
          />
        )}
      </li>
    </Reveal>
  );
};

export default AppFeature;
