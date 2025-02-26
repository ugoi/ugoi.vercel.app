import React from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import profilePicture from "../../assets/profileBeach.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Home2: React.FC = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "#fff",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Let me introduce myself
              </Typography>
              <Typography variant="h6" paragraph>
                Hello there! I'm a student from 42 Heilbronn with a flair for
                bringing ideas into the digital world. I immerse myself in
                understanding your vision to create tailor-fit digital
                experiences.
              </Typography>
              <Typography variant="h6" paragraph>
                From crafting interactive prototypes to developing robust APIs
                and seamless front-end designs, I blend creativity with
                technology to build award-worthy projects.
              </Typography>
              <Typography variant="h6" paragraph>
                Let's connect and transform your ideas into compelling digital
                realities!
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              background: "linear-gradient(135deg, #1f1c2c, #928dab)",
            }}
          >
            <Box
              component="img"
              src={profilePicture}
              alt="Stefan Dukic"
              sx={{
                width: { xs: 180, md: 220 },
                height: "auto",
                borderRadius: 2,
                boxShadow: 6,
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>
      </Card>
      <Box
        my={6}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        data-testid="connect-section"
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            mb: 4,
          }}
        >
          Connect
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          sx={{
            "& .MuiIconButton-root": {
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              padding: "15px",
              width: "60px",
              height: "60px",
              "&:hover": {
                transform: "scale(1.1)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "2px solid rgba(255, 215, 0, 0.5)",
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)",
                "& .MuiSvgIcon-root": {
                  color: "#ffd700",
                  transform: "scale(1.1)",
                },
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            },
            "& .MuiSvgIcon-root": {
              fontSize: "2rem",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              color: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <IconButton
            href="https://www.linkedin.com/in/stefan-dukic-68682b20b/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            data-testid="linkedin-button"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            href="https://github.com/ugoi"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            data-testid="github-button"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Home2;
