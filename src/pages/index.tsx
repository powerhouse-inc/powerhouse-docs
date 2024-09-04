import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import ConnectIcon from '@site/static/img/connect-icon.png';
import FusionIcon from '@site/static/img/fusion-icon.png';
import RenownIcon from '@site/static/img/renown-icon.png';
import SwitchboardIcon from '@site/static/img/switchboard-icon.png';
import AcademyIcon from '@site/static/img/academy-icon.png';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header 
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        backgroundImage: `url('/img/empty-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.iconContainer}>
          <img src={ConnectIcon} alt="Connect" className={styles.icon} />
          <img src={SwitchboardIcon} alt="Switchboard" className={styles.icon} />
          <img src={FusionIcon} alt="Fusion" className={styles.icon} />
          <img src={RenownIcon} alt="Renown" className={styles.icon} />
          <img src={AcademyIcon} alt="Academy" className={styles.icon} />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
