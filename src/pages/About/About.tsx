import { Container, Typography, Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { scrollToNextSection } from "./utils";

// src/data/data.js or a similar location
const sectionsData = [
  {
    id: "section-0",
    title: "Design & Prototyping",
    content:
      "I embrace an agile design approach, focusing on rapid iteration and continuous improvement. Rather than spending extensive time on detailed upfront designs, I start with a minimal, functional design that covers core user flows. This allows us to quickly develop and test the application, gathering real user feedback that shapes the design evolution. Using Figma as my design tool, I adapt and refine the interface based on user interactions and changing requirements. This flexible approach ensures we deliver value faster while maintaining the ability to pivot and enhance the design throughout development. In today's fast-paced digital world, this agile methodology helps reduce risks, save costs, and ensures your product stays relevant by adapting to user needs.",
  },
  {
    id: "section-1",
    title: "Frontend Development",
    content:
      "I specialize in developing intuitive and responsive experiences across web, mobile, tablet, and desktop platforms. From sleek websites to feature-rich web applications, native mobile and tablet apps, and desktop software, I focus on creating user-friendly interfaces that work seamlessly across all devices. In today's multi-device world, having a consistent and engaging user experience across all platforms is crucial for reaching and retaining users. A well-crafted frontend not only attracts users but also increases engagement, improves conversion rates, and strengthens your brand's digital presence. Let's collaborate to turn your vision into reality.",
  },
  {
    id: "section-2",
    title: "Backend Development",
    content:
      "I develop efficient and scalable backend systems that support your application's functionality. From server-side logic and database management to API integration, I ensure a robust foundation for seamless data handling and business logic execution. A strong backend is the engine that powers your application, handling critical operations, ensuring data security, and enabling smooth scaling as your user base grows. Without reliable backend infrastructure, even the most beautiful frontend can fail to deliver value. Let's build powerful backend solutions that provide the performance, security, and reliability your project needs.",
  },
  {
    id: "section-3",
    title: "API Development",
    content:
      "I create and integrate APIs to enable seamless communication between your applications and other systems. Whether you need to integrate third-party services or build custom APIs, I provide secure, reliable, and well-documented solutions. In our interconnected digital ecosystem, APIs are the bridges that connect different services and enable powerful functionality. Well-designed APIs can expand your application's capabilities, improve user experience through integrated services, and even create new revenue streams through API monetization. Let's build the connections that will take your application to the next level.",
  },
  {
    id: "section-4",
    title: "Database Management",
    content:
      "I offer expertise in database design and management, ensuring your data is stored efficiently and is easily retrievable. Proficient in both SQL and NoSQL technologies, I can help you choose and manage the right database solutions for your application's needs. Effective data management is crucial in today's data-driven world - it affects your application's performance, scalability, and ability to provide valuable insights. The right database architecture can significantly reduce costs, improve response times, and enable better decision-making through efficient data analysis.",
  },
  {
    id: "section-5",
    title: "CI/CD Pipeline",
    content:
      "I implement comprehensive CI/CD pipelines that streamline your entire development lifecycle. Continuous Integration automatically builds and tests code changes, catching issues early and ensuring code quality. Continuous Delivery takes this further by automating the deployment process, making it possible to reliably release updates at any time. While CI focuses on integrating and validating code changes, CD ensures these validated changes can be deployed to production quickly and safely. This complete automation pipeline reduces manual errors, speeds up development cycles, and enables rapid, confident updates to your application. The result? Faster time-to-market, lower development costs, more reliable software, and the ability to respond quickly to user feedback and market changes.",
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
