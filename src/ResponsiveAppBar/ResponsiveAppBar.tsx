import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom"; // Import Link
import { Slide, useScrollTrigger } from "@mui/material";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface ResponsiveAppBarProps {
  routes: {
    name: string;
    path: string;
    component?: string;
    isLogo?: boolean;
  }[];
}

function ResponsiveAppBar({ routes, ...props }: ResponsiveAppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoRoute = routes.find((route) => route.isLogo);
  const rootPath = logoRoute ? logoRoute.path : "/"; // defaulting to '/' if no logo route is found
  const testIdLogo = logoRoute
    ? `${logoRoute.name.toLowerCase()}-button`
    : "home-button"; // Generating the testId from the logoRoute

  return (
    <div data-testid="responsive-app-bar" {...props}>
      <HideOnScroll>
        <AppBar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                data-testid={testIdLogo}
                variant="h6"
                noWrap
                component={Link} // Use Link component
                to={rootPath}
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Sd.
              </Typography>

              <Typography
                data-testid={`${testIdLogo}-xs`}
                variant="h5"
                noWrap
                component={Link} // Use Link component
                to={rootPath}
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Sd.
              </Typography>
              <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                {routes
                  .filter((route) => !route.isLogo)
                  .map((route) => (
                    <Button
                      data-testid={`${route.name.toLowerCase()}-button`}
                      key={route.path}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                      component={Link}
                      to={route.path}
                    >
                      {route.name}
                    </Button>
                  ))}
              </Box>

              <Box
                sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}
                data-testid="menu-box-xs"
              >
                <IconButton
                  data-testid="icon-button-xs"
                  size="large"
                  aria-label="app bar drop down"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  data-testid="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {routes
                    .filter((route) => !route.isLogo)
                    .map((route) => (
                      <MenuItem
                        data-testid={`${route.name.toLowerCase()}-button-xs`}
                        key={route.path}
                        onClick={handleCloseNavMenu}
                        component={Link}
                        to={route.path}
                      >
                        <Typography textAlign="center">{route.name}</Typography>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}
export default ResponsiveAppBar;
