import Banner from "./sections/Banner.tsx";
import News from "./sections/News.tsx";

import Projects from "./sections/Projects.tsx";
import Contacts from "./sections/Contacts.tsx";
import Partners from "./sections/Partners.tsx";

export default function HomePage() {
  return (
    <>
      <Banner />
      <News />
      <Projects />
      <Contacts />
      <Partners />
    </>
  );
}
