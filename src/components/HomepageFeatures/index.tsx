import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  imageSrc: string;
  docPath: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Connect",
    imageSrc: require("@site/static/img/connect.png").default,
    docPath: "/docs/connect/intro",
    description: (
      <>
        Learn about the private contributor tool Connect & its document models
      </>
    ),
  },
  {
    title: "Switchboard",
    imageSrc: require("@site/static/img/switchboard.png").default,
    docPath: "/docs/switchboard/intro",
    description: <>Get access to the API interface through Switchboard</>,
  },
  {
    title: "Reactor",
    imageSrc: require("@site/static/img/reactor.png").default,
    docPath: "/docs/reactor/intro",
    description: (
      <>Find out how a Powerhouse Reactor node works</>
    ),
  },
  {
    title: "Renown",
    imageSrc: require("@site/static/img/renown.png").default,
    docPath: "/docs/renown/intro",
    description: (
      <>
        Dive into the customizable reputation system that consolidates data from
        Powerhouse applications
      </>
    ),
  },
];

function Feature({ title, imageSrc, description, docPath }: FeatureItem) {
  return (
    <div className={clsx("col col--3")}>
      <Link to={docPath} className={styles.featureLink}>
        <div className={styles.featureContent}>
          <div className={styles.featureImageWrapper}>
            <img src={imageSrc} alt={title} className={styles.featureImage} />
          </div>
          <div className={styles.featureText}>
            <Heading as="h4" className={styles.featureTitle}>{title}</Heading>
            <p className={styles.featureDescription}>{description}</p>
          </div>
        </div>
      </Link>
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
