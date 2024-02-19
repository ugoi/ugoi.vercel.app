import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import homeLogo from "../../assets/web-developer.svg";
import Home2 from "./Home2";
import Type from "./Type";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const Home: React.FC = () => {
  const theme = useTheme();

  const StyledTypeWriter = styled("div")({
    ...theme.typography.h3,
    [theme.breakpoints.down("md")]: {
      ...theme.typography.h3, // iPad and similar sized devices
    },

    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h4, // iPhones and similar sized devices
    },

    [theme.breakpoints.down("xs")]: {
      ...theme.typography.h4, // smaller sized devices
    },
    color: "silver",
    height: "100px",
  });

  return (
    <Container maxWidth="lg" data-testid="home-page">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "top",
          minHeight: "100vh",
          my: 9,
        }}
      >
        <Grid container spacing={3} alignItems="center" mt={3}>
          <Grid
            item
            md={7}
            xs={12}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography
              sx={{ typography: { xs: "h4", sm: "h3" } }}
              gutterBottom
            >
              Hi There!{" "}
              <span role="img" aria-label="wave">
                👋🏻
              </span>
            </Typography>
            <Typography sx={{ typography: { xs: "h4", sm: "h3" } }}>
              I'm <span style={{ fontWeight: "bold" }}>Stefan Dukic</span>
            </Typography>
            <Box mt={3}>
              <StyledTypeWriter data-testid="typewriter">
                <Type />
              </StyledTypeWriter>
            </Box>
          </Grid>
          <Grid item md={5} xs={12}>
            <img src={homeLogo} alt="home" style={{ maxHeight: "300px" }} />
          </Grid>
        </Grid>
      </Box>
      <Home2 />
    </Container>
  );
};

export default Home;
