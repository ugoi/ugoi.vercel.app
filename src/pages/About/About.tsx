import { Container, Typography } from "@mui/material";
import { scrollToNextSection } from "./utils";

// src/data/data.js or a similar location
const sectionsData = [
  {
    id: "section-0",
    title: "Design & Prototyping",
    content:
      "While exceptional design is important, testing and validating your project's logic early is crucial. I prioritize developing a minimum viable product (MVP) to test functionality before finalizing the design. Using Figma primarily as a design tool, I focus on creating user-friendly interfaces after the core logic has been established. This approach allows for better feedback and iteration. Let's build a solid foundation together before crafting the visual elements that will engage your audience.",
  },
  {
    id: "section-1",
    title: "Frontend Development",
    content:
      "I specialize in developing intuitive and responsive frontend experiences. Whether it's a simple website or a complex web application, I focus on creating user-friendly interfaces that work seamlessly across all devices. Let's collaborate to turn your vision into reality.",
  },
  {
    id: "section-2",
    title: "Backend Development",
    content:
      "I develop efficient and scalable backend systems that support your application's functionality. From server-side logic and database management to API integration, I ensure a robust foundation for seamless data handling and business logic execution. Let's build powerful backend solutions to support your project.",
  },
  {
    id: "section-3",
    title: "API Development",
    content:
      "I create and integrate APIs to enable seamless communication between your applications and other systems. Whether you need to integrate third-party services or build custom APIs, I provide secure, reliable, and well-documented solutions.",
  },
  {
    id: "section-4",
    title: "Database Management",
    content:
      "I offer expertise in database design and management, ensuring your data is stored efficiently and is easily retrievable. Proficient in both SQL and NoSQL technologies, I can help you choose and manage the right database solutions for your application's needs.",
  },
  {
    id: "section-5",
    title: "Continuous Integration",
    content:
      "I can help implement continuous integration systems, facilitating automated testing and reliable software releases. This streamlines your development process, reduces integration issues, and improves the quality of your builds.",
  },
];

const url = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

const About = () => {
  // Handler for container click, integrates other functions
  const handleContainerClick = () => {
    const sectionIds = sectionsData.map((section) => section.id);
    scrollToNextSection(sectionIds);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "left",
        backgroundImage: url("stars", true),
      }}
      data-testid="about-page"
      onClick={handleContainerClick}
    >
      <Container>
        {sectionsData.map((section, index) => (
          <Container
            key={index}
            id={`section-${index}`}
            style={{ height: "100vh" }}
          >
            <Typography
              sx={{
                typography: { xs: "h3", md: "h2" },
              }}
              component="h2"
              gutterBottom
            >
              {section.title}
            </Typography>
            <Typography
              sx={{
                typography: { xs: "h6", md: "h5" },
              }}
              paragraph
            >
              {section.content}
            </Typography>
          </Container>
        ))}
      </Container>
    </div>
  );
};

export default About;
