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
    docPath: "docs/academy/AdvancedTopics/PowerhouseArchitecture",
    description: (
      <>
        Learn about the private contributor tool Connect
      </>
    ),
  },
  {
    title: "Switchboard",
    imageSrc: require("@site/static/img/switchboard.png").default,
    docPath: "docs/academy/WorkWithData/IntroducingSwitchboard",
    description: <>Get access to the open API interface with Switchboard</>,
  },
  {
    title: "Fusion",
    imageSrc: require("@site/static/img/fusion.png").default,
    docPath: "/docs/academy/Front-endImplementations/IntroducingFusion",
    description: (
      <>
        Setup Fusion as your organizations dashboard
      </>
    ),
  },
  {
    title: "Renown",
    imageSrc: require("@site/static/img/renown.png").default,
    docPath: "/docs/renown/intro",
    description: (
      <>
        Dive into the customizable reputation system 
      </>
    ),
  },
  {
    title: "Reactor",
    imageSrc: require("@site/static/img/reactor.png").default,
    docPath: "/docs/academy/AdvancedTopics/WorkingWithTheReactor",
    description: (
      <>Find out how a Powerhouse Reactor node works</>
    ),
  },
];

function Feature({ title, imageSrc, description, docPath }: FeatureItem) {
  return (
    <div className={styles.col}>
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
      <div className={styles.featuresWrapper}>
        {/* Learning Path Cards */}
        <div className={styles.learningPath}>
          <div className={styles.pathRow}>
            {/* Column 1: Get Started & Create */}
            <div className={styles.pathColumn}>
              <h2 className={styles.pathColumnTitle}>Explore Powerhouse</h2>
              <div className={styles.pathCard}>
                <h3 className={styles.cardTitle}>Get started 🚀</h3>
                <div className={styles.cardContent}>
                  <a href="docs/academy/GetStarted/GetStarted-Intro" className={styles.pathButton}>Learn about Powerhouse in 3 minutes</a>
                </div>
              </div>
              <div className={styles.pathCard}>
                <h3 className={styles.cardTitle}>Create ⚡</h3>
                <div className={styles.cardContent}>
                  <a href="docs/academy/Create/ToDoList/CreateNewPowerhouseProject" className={styles.pathButton}>Build a Todo-list document model, editor & API endpoint</a>
                </div>
              </div>
            </div>

            {/* Column 2: User Experiences & Work with data */}
            <div className={styles.pathColumn}>
              <h2 className={styles.pathColumnTitle}>For Designers & Engineers</h2>
              <div className={styles.pathCard}>
                <h3 className={styles.cardTitle}>Build user experiences 🎨</h3>
                <div className={styles.cardContent}>
                  <a href="docs/academy/BuildingUserExperiences/BuildingBeautifulDocumentEditors" className={styles.pathButton}>Creating beautiful document editors</a>
                </div>
              </div>
              <div className={styles.pathCard}>
                <h3 className={styles.cardTitle}>Work with data 📊</h3>
                <div className={styles.cardContent}>
                  <a href="/docs/academy/WorkWithData/ReadingAndWritingThroughTheAPI" className={styles.pathButton}>Reading & writing documents through the API</a>
                </div>
              </div>
            </div>

            {/* Column 3: Packages & Frontend */}
            <div className={styles.pathColumn}>
              <h2 className={styles.pathColumnTitle}>Solutions</h2>
              <div className={styles.pathCard}>
                <h3 className={styles.cardTitle}>Packages 📦</h3>
                <div className={styles.cardContent}>
                  <a href="docs/academy/Packages/PublishYourProject" className={styles.pathButton}>Publishing and deploying packages</a>
                </div>
              </div>
              <div className={styles.pathCard}>
                <h3 className={styles.cardTitle}>Front-end implementation 🖥️</h3>
                <div className={styles.cardContent}>
                  <a href="docs/academy/Front-endImplementations/IntegrateInAFront-End" className={styles.pathButton}>Using Powerhouse in a front-end environment</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Features Section */}
        <h2 className={styles.sectionTitle}>Browse by host-application</h2>
        <div className={styles.row}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
