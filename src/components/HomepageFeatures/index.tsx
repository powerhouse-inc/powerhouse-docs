import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  imageSrc: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Connect",
    imageSrc: require("@site/static/img/connect.png").default,
    description: (
      <>
        Learn about the private contributor tool Connect & its document models
      </>
    ),
  },
  {
    title: "Switchboard",
    imageSrc: require("@site/static/img/switchboard.png").default,
    description: (
      <>
        Get access to the API interface through Switchboard
      </>
    ),
  },
  {
    title: "Fusion",
    imageSrc: require("@site/static/img/fusion.png").default,
    description: (
      <>
        Find out how to create data transparency & clarity with Fusion
      </>
    ),
  },
];

function Feature({ title, imageSrc, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={imageSrc} alt={title} className={styles.featureImage} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
