import { Container, Typography, Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";
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

// Utility function to reference background assets (adjust URL as needed)
const url = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

// Keyframes for fadeIn animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main container with a background image and fadeIn effect
const AboutContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#1f1c2c",
  backgroundImage: url("stars", true),
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: theme.spacing(4),
  animation: `${fadeIn} 1s ease-out`,
}));

// A styled container for each section using a glassmorphic look
const SectionContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: theme.spacing(6),
  paddingTop: theme.spacing(10),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(8px)",
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

// Gradient styled typography for section titles
const GradientTypography = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #ffd700, #ff8c00)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "2rem", // Default size
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem", // Smaller size for mobile devices
  },
  wordBreak: "break-word", // Allows words to break if needed
  hyphens: "auto", // Enables hyphenation
  "@media (max-width: 350px)": {
    fontSize: "1.2rem", // Even smaller for very narrow screens
  },
}));

const About = () => {
  // Handler for container click, integrates other functions
  const handleContainerClick = () => {
    const sectionIds = sectionsData.map((section) => section.id);
    scrollToNextSection(sectionIds);
  };
  return (
    <AboutContainer data-testid="about-page" onClick={handleContainerClick}>
      <Container maxWidth="lg">
        {sectionsData.map((section) => (
          <SectionContainer key={section.id} id={section.id}>
            <GradientTypography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              {section.title}
            </GradientTypography>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                lineHeight: 1.6,
                fontSize: {
                  xs: "1rem", // Small screens (mobile)
                  sm: "1.1rem", // Medium screens (tablets)
                  md: "1.25rem", // Default h6 size for larger screens
                },
              }}
              paragraph
            >
              {section.content}
            </Typography>
          </SectionContainer>
        ))}
      </Container>
    </AboutContainer>
  );
};

export default About;
