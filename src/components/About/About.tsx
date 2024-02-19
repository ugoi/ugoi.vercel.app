import { Container, Typography } from "@mui/material";
import { scrollToNextSection } from "./utils";

// src/data/data.js or a similar location
const sectionsData = [
  {
    id: "section-0",
    title: "Design & Prototyping",
    content:
      "In today’s digital landscape, first impressions are critical. Exceptional design is key to engaging and keeping your audience. I offer comprehensive design services, focusing on striking, user-friendly designs to make your project stand out. I collaborate closely with you from early sketches to polished prototypes, streamlining the user experience before coding begins. Let's craft designs that captivate your audience and pave the way for your project's triumph.",
  },
  {
    id: "section-1",
    title: "Frontend Development",
    content:
      "Are you in need of an expert to bring your user interfaces to life? Look no further. I specialize in crafting intuitive and dynamic frontend experiences that captivate and engage. Whether it's a simple website or a complex web application, I ensure your project will not only look good but will also be user-friendly, accessible, and responsive across all devices. Let's work together to make your vision a tangible reality.",
  },
  {
    id: "section-2",
    title: "Backend Development",
    content:
      "Back-end development is the backbone of web applications, ensuring everything runs smoothly behind the scenes. My expertise lies in creating efficient, scalable back-end systems that support the functionality and user experience of your digital products. From server-side logic and database management to API integration, I ensure a robust foundation for your applications, enabling seamless data handling and business logic execution. Let's build powerful back-end solutions that propel your projects forward.",
  },
  {
    id: "section-3",
    title: "API Development",
    content:
      "In today’s interconnected digital ecosystem, your applications need to communicate seamlessly with other systems and services. I am adept at creating and integrating APIs that allow for such interactions, ensuring that your software components work together harmoniously. Whether you're looking to integrate with third-party services or build custom APIs for your own applications, I can provide the secure, reliable, and well-documented API solutions you need.",
  },
  {
    id: "section-4",
    title: "Database Management",
    content:
      "Data is at the heart of every application. I offer my expertise in database design and management, ensuring that your data is not just stored but is also meaningful and easily retrievable. With a solid understanding of both SQL and NoSQL database technologies, I can help you choose and manage the right database solutions that align with your needs, providing a solid foundation for your data-driven applications.",
  },
  {
    id: "section-5",
    title: "Continuous Integration",
    content:
      "The world of technology moves quickly, and your development practices should keep pace. I can assist you in implementing continuous integration systems, facilitating automated testing, and ensuring that your software can be reliably released at any time. With my help, you can streamline your development process, reduce integration issues, and increase the quality of your software builds.",
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
