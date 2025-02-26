import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";

interface Route {
  name: string;
  path: string;
  isLogo?: boolean;
}

interface ResponsiveAppBarProps {
  routes: Route[];
}

const StyledAppBar = styled(AppBar)(() => ({
  background: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark background for a modern glassmorphism effect
  backdropFilter: "blur(10px)",
  boxShadow: "none",
}));

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ routes }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar position="sticky" data-testid="responsive-app-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Icon */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                "&:focus": {
                  outline: "none",
                },
                "&.Mui-focusVisible": {
                  outline: "2px solid #ffd700",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.95)",
                  backdropFilter: "blur(10px)",
                  width: "100vw",
                  height: "100vh",
                  top: "0 !important",
                  left: "0 !important",
                  position: "fixed",
                  maxWidth: "none",
                  maxHeight: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                },
                "& .MuiList-root": {
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "2rem",
                },
              }}
            >
              {routes.map((route) => (
                <MenuItem
                  key={route.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={route.path}
                  data-testid={`${route.name.toLowerCase()}-button`}
                  sx={{
                    width: "auto",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    padding: "1rem 2rem",
                  }}
                >
                  <Typography textAlign="center" sx={{ color: "#fff" }}>
                    {route.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Navigation - All items including logo aligned to the right */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {routes.map((route) =>
              route.isLogo ? (
                <Button
                  key={route.name}
                  component={RouterLink}
                  to={route.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#fff",
                    display: "flex",
                    mx: 2,
                    fontWeight: 500,
                    textTransform: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "fit-content",
                  }}
                  data-testid="home-button"
                >
                  {route.name}
                </Button>
              ) : (
                <Button
                  key={route.name}
                  component={RouterLink}
                  to={route.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#fff",
                    display: "flex",
                    mx: 2,
                    fontWeight: 500,
                    textTransform: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "fit-content",
                  }}
                  data-testid={`${route.name.toLowerCase()}-button`}
                >
                  {route.name}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default ResponsiveAppBar;
