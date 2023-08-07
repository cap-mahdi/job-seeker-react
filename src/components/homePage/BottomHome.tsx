import AppFeature from "./AppFeature";
import styles from "./BottomHome.module.css";
import { Reveal } from "./Reveal";
import Icon from "./Icon";
import ChangedText from "./ChangedText";

const features = [
  {
    description: ["Find jobs near you", "Find jobs in your favourite zone."],
    image: "map.png",
  },
  {
    description: ["Find jobs that match your skills and interests."],
    image: "skills.png",
  },
  {
    description: ["Apply to jobs with a single click."],
    image: "apply.png",
  },
];

const contacts = [
  {
    link: "https://www.facebook.com/mahdi.chaaben1/",
    image: "facebook.webp",
  },
  {
    link: "https://www.linkedin.com/in/mahdi-chaabane/",
    image: "linkdn.png",
  },
  {
    link: "https://github.com/cap-mahdi",
    image: "github.png",
  },
  {
    copy: "mahdi02ch@gmail.com",
    image: "gmail.png",
  },
];
interface Props {
  featuresDiv: React.RefObject<HTMLDivElement>;
}

function BottomHome({ featuresDiv }: Props) {
  return (
    <main className={styles.container}>
      <div className={styles.description}>
        <Reveal
          color="#ffcbcb"
          className={styles.descriptionContent}
          everyScroll={false}
        >
          <h2>..... JOB SEEKER .....</h2>

          <ChangedText />
        </Reveal>
      </div>
      <div className={styles.features} ref={featuresDiv}>
        <h2>..... App features .....</h2>
        <ul>
          {features.map((feature, index) => (
            <AppFeature key={index} feature={feature} index={index} />
          ))}
        </ul>
      </div>
      <div className={styles.contact}>
        <h2>..... Contact us .....</h2>
        <div className={styles.socials}>
          {contacts.map((contact, index) => (
            <Icon key={index} contact={contact} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default BottomHome;
