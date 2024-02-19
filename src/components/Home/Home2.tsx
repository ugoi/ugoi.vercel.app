import React from "react";
import { Grid, Typography, Box, Avatar, IconButton } from "@mui/material";
import profilePicture from "../../assets/profileBeach.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Home2: React.FC = () => {
  return (
    <Box>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={8} xs={12}>
          <Typography
            gutterBottom
            sx={{
              mx: { xs: 3, md: 0 },
              typography: { xs: "h4", md: "h3" },
            }}
          >
            Let me introduce myself
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
            Hello there! I'm a student from 42 Heilbronn with a flair for
            bringing ideas into the digital world. For me, it all starts with
            understanding your vision. By gathering your requirements, I ensure
            that each project is a custom-fit for its intended users.
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
            Crafting intuitive designs comes next, where your concept begins to
            take shape in visual and interactive prototypes. This allows us to
            iterate and perfect the project's design early in the process.
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
            When it comes to bringing these designs to life, it's a symphony of
            technology. Mobile apps and websites are just the start. Underneath
            the surface, a robust database is key—it's like the foundation of a
            building that keeps the data organized and accessible.
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
            But that's not all. A seamless front-end for users, a reliable
            back-end for data processing, APIs for communication between
            different software parts, and thorough testing to ensure everything
            works as it should, all come together to create a harmonious and
            efficient app experience.
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
            My approach is to meticulously integrate these technologies,
            ensuring each piece works in concert to serve the final product.
            Let's connect and weave your vision into a digital reality that's as
            functional as it is striking!
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar
            src={profilePicture}
            alt="Your Name"
            style={{
              width: "240px",
              height: "auto",
              marginBottom: "1em",
              borderRadius: 6, // Make the avatar square
            }}
          />
        </Grid>
      </Grid>
      <Box
        my={12}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        data-testid="connect-section"
      >
        <Box>
          <Typography
            sx={{ typography: { xs: "h4", md: "h3" } }}
            color="silver"
          >
            Connect
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={0}
        >
          <IconButton
            href="https://www.linkedin.com/in/stefan-dukic-68682b20b/"
            target="_blank"
            rel="noreferrer"
            color="primary"
            data-testid="linkedin-button"
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>

          <IconButton
            href="https://github.com/ugoi"
            target="_blank"
            rel="noreferrer"
            color="primary"
            data-testid="github-button"
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Home2;
