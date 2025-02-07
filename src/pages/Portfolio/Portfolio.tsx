import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Web";
import projects from "./projectsData";
import { styled, keyframes } from "@mui/material/styles";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[6],
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(8px)",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const GradientTypography = styled(Typography)({
  background: "linear-gradient(45deg, #ffd700, #ff8c00)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const Portfolio: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      data-testid="portfolio-page"
      sx={{
        py: 8,
        textAlign: "center",
        animation: `${fadeIn} 1s ease-out`,
      }}
    >
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <GradientTypography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            My Portfolio
          </GradientTypography>
          <Typography variant="h6" gutterBottom>
            A showcase of projects that push the boundaries of creativity and
            technology.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              animation: `${fadeIn} 1s ease-out`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <StyledCard data-testid={`project-card-${index}`}>
              <CardMedia
                component="img"
                height="250"
                image={project.imageUrl}
                alt={project.title}
                sx={{
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="GitHub"
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`github-link-${index}`}
                >
                  <GitHubIcon sx={{ mr: 0.5 }} />
                  <Typography variant="body2" component="span">
                    GitHub
                  </Typography>
                </IconButton>
                {project.deployedLink && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    href={project.deployedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`deployed-link-${index}`}
                  >
                    <WebIcon sx={{ mr: 0.5 }} />
                    <Typography variant="body2" component="span">
                      View Deployed
                    </Typography>
                  </IconButton>
                )}
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Portfolio;
