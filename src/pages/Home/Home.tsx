import React from "react";
import { Container, Typography, Box } from "@mui/material";
import homeLogo from "../../assets/web-developer.svg";
import Home2 from "./Home2";
import Type from "./Type";
import { styled, keyframes } from "@mui/material/styles";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  textAlign: "center",
  color: "#fff",
}));

const StyledTypeWriter = styled("div")(({ theme }) => ({
  ...theme.typography.h3,
  [theme.breakpoints.down("md")]: {
    ...theme.typography.h3,
  },
  [theme.breakpoints.down("sm")]: {
    ...theme.typography.h4,
  },
  [theme.breakpoints.down("xs")]: {
    ...theme.typography.h4,
  },
  color: "#ffd700", // a striking gold accent
  height: "100px",
  animation: `${fadeIn} 1s ease-out`,
}));

const Home: React.FC = () => {
  return (
    <Box>
      <HeroContainer>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ animation: `${fadeIn} 1s ease-out`, fontWeight: 700 }}
        >
          Hi There!{" "}
          <span role="img" aria-label="wave">
            👋🏻
          </span>
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ animation: `${fadeIn} 1.2s ease-out`, fontWeight: 500 }}
        >
          I'm{" "}
          <span style={{ fontWeight: "bold", color: "#ffd700" }}>
            Stefan Dukic
          </span>
        </Typography>
        <Box mt={3}>
          <StyledTypeWriter data-testid="typewriter">
            <Type />
          </StyledTypeWriter>
        </Box>
        <Box mt={4}>
          <img
            src={homeLogo}
            alt="home"
            style={{ maxHeight: "300px", animation: "1s ease-out fadeIn" }}
          />
        </Box>
      </HeroContainer>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Home2 />
      </Container>
    </Box>
  );
};

export default Home;
