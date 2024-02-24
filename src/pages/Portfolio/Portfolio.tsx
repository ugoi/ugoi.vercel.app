import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Container,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import projects from "./projectsData";
import WebIcon from "@mui/icons-material/Web";

const Portfolio: React.FC = () => {
  return (
    <Container data-testid="portfolio-page" style={{ textAlign: "center" }}>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            My Best Projects
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            A showcase of my most notable work.
          </Typography>
        </Grid>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card data-testid={`project-card-${index}`}>
              <CardMedia
                component="img"
                height="250"
                image={project.imageUrl}
                alt={project.title}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h5" component="div">
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
                  <GitHubIcon sx={{ mr: 1 }} />
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
                    <WebIcon sx={{ mr: 1 }} />
                    <Typography variant="body2" component="span">
                      View Deployed
                    </Typography>
                  </IconButton>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Portfolio;
