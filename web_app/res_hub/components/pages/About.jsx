import styles from "../../styles/components/About.module.css";

const features = [
  {
    icon: "search",
    title: "Discover residences",
    text: "Explore off-campus accommodation and compare the details that matter to you.",
  },
  {
    icon: "star",
    title: "Read student reviews",
    text: "Learn from experiences shared by students who have lived in a residence.",
  },
  {
    icon: "building",
    title: "Compare services",
    text: "Find feedback about residence facilities, services and living conditions.",
  },
  {
    icon: "image",
    title: "See shared photos",
    text: "Get a better sense of a place through photos of its spaces and infrastructure.",
  },
  {
    icon: "heart",
    title: "Save helpful reviews",
    text: "Like useful reviews so other students can find them more easily.",
  },
  {
    icon: "shield",
    title: "Support responsible listings",
    text: "Res Hub gives administrators tools to manage listings and moderate content.",
  },
];

const featureSymbols = {
  search: "⌕",
  star: "★",
  building: "⌂",
  image: "▧",
  heart: "♡",
  shield: "✓",
};

function FeatureIcon({ name }) {
  return (
    <span className={styles.aboutFeatureIcon} aria-hidden="true">
      {featureSymbols[name]}
    </span>
  );
}

export default function About({ exploreHref = "/residences" }) {
  return (
    <main className={styles.aboutPage}>

      <section className={styles.aboutStory} id="our-story">
        <div className={styles.aboutSectionHeading}>
          <p className={styles.aboutKicker}>Our story</p>
          <h2>Finding accommodation is about more than an address.</h2>
        </div>

        <div className={styles.aboutStoryCopy}>
          <p>
            Searching for off-campus accommodation can mean piecing together
            details from listings, word of mouth and scattered photos. It can
            be difficult to get a sense of a residence’s facilities, services
            and day-to-day living conditions before making a decision.
          </p>
          <p>
            Res Hub gives students a place to explore residence information and
            read experiences shared by other students. It is designed to make
            useful information easier to find as you compare your options.
          </p>
        </div>
      </section>

      <section
        className={styles.aboutPurpose}
        aria-label="Our mission and vision"
      >
        <article
          className={`${styles.aboutPurposeCard} ${styles.aboutPurposeMission}`}
        >
          <span className={styles.aboutPurposeNumber}>01</span>
          <p className={styles.aboutKicker}>Our mission</p>
          <h2>Help students make informed choices.</h2>
          <p>
            We bring residence information and student perspectives together
            so students can make accommodation decisions with more context.
          </p>
        </article>

        <article
          className={`${styles.aboutPurposeCard} ${styles.aboutPurposeVision}`}
        >
          <span className={styles.aboutPurposeNumber}>02</span>
          <p className={styles.aboutKicker}>Our vision</p>
          <h2>A more informed student community.</h2>
          <p>
            We want Res Hub to grow into a useful, trusted place to learn about
            off-campus residences and the living conditions students may
            encounter.
          </p>
        </article>
      </section>

      <section
        className={styles.aboutFeatures}
        id="what-res-hub-offers"
        aria-labelledby="about-features-title"
      >
        <div
          className={`${styles.aboutSectionHeading} ${styles.aboutSectionHeadingCentered}`}
        >
          <p className={styles.aboutKicker}>What Res Hub offers</p>
          <h2 id="about-features-title">
            Useful details for the search ahead.
          </h2>
          <p>
            Explore options, learn from shared experiences and focus on what
            matters to you.
          </p>
        </div>

        <div className={styles.aboutFeatureGrid}>
          {features.map((feature) => (
            <article className={styles.aboutFeatureCard} key={feature.title}>
              <FeatureIcon name={feature.icon} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.aboutValues}
        aria-labelledby="about-values-title"
      >
        <div className={styles.aboutValuesIntro}>
          <p className={styles.aboutKicker}>Why Res Hub?</p>
          <h2 id="about-values-title">
            Student perspectives can make the search clearer.
          </h2>
        </div>

        <div className={styles.aboutValueList}>
          <article className={styles.aboutValue}>
            <span>01</span>
            <div>
              <h3>More context</h3>
              <p>
                Bring residence details and shared experiences together in one
                place.
              </p>
            </div>
          </article>

          <article className={styles.aboutValue}>
            <span>02</span>
            <div>
              <h3>Different perspectives</h3>
              <p>
                Read what students choose to share as you consider your
                accommodation options.
              </p>
            </div>
          </article>

          <article className={styles.aboutValue}>
            <span>03</span>
            <div>
              <h3>Your decision, better informed</h3>
              <p>
                Compare the information available and decide which questions
                you want to ask next.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.aboutCta}>
        <div>
          <p className={styles.aboutKicker}>Start with what matters to you</p>
          <h2>Your next accommodation search can start here.</h2>
          <p>
            Explore residences and use the available details to guide your
            search.
          </p>
        </div>

        <a
          className={`${styles.aboutButton} ${styles.aboutButtonLight}`}
          href={exploreHref}
        >
          Explore residences
          <span className={styles.aboutArrow} aria-hidden="true">
            →
          </span>
        </a>
      </section>
    </main>
  );
}