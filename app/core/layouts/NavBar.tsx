import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Suspense } from "react"
import { Menu, MenuItem } from "@mui/material"
import { Link, Routes, useMutation, useRouter } from "blitz"
import logout from "app/auth/mutations/logout"

function NavBarBase() {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [logoutMutation] = useMutation(logout)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (currentUser) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <IconButton
              color="primary"
              size="small"
              style={{
                backgroundColor: "white",
              }}
              onClick={handleMenu}
            >
              {currentUser.firstName[0]}
              {currentUser.lastName[0]}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                Log out
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(Routes.ProfilePage())
                }}
              >
                Profile
              </MenuItem>
              <MenuItem>Settings</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    )
  } else {
    return (
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button
              onClick={() => {
                router.push(Routes.LoginPage())
              }}
              color="inherit"
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
}

export default function NavBar() {
  return (
    <Suspense fallback="Loading...">
      <NavBarBase />
    </Suspense>
  )
}
