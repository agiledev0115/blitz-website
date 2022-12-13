import * as React from "react"
import { styled, useTheme, Theme, CSSObject, alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import FolderOffIcon from "@mui/icons-material/FolderOff"
import EditIcon from "@mui/icons-material/Edit"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import ListItem from "@mui/material/ListItem"
import FolderIcon from "@mui/icons-material/Folder"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { Routes, useQuery, useRouter } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Collapse, Grid, InputAdornment, Stack, TextField } from "@mui/material"
import { LogoIcon } from "public/Logo"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import ApartmentIcon from "@mui/icons-material/Apartment"
import {
  Archive,
  ExpandLess,
  ExpandMore,
  Payment,
  People,
  RateReview,
  Settings,
  StarBorder,
} from "@mui/icons-material"
import getSpaces from "app/spaces/queries/getSpaces"
import getSpacesWithAll from "app/spaces/queries/getSpacesWithAll"
import { Space } from "@prisma/client"
import SubMenu from "../components/SubMenu"

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1.5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 2,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#FAFAFA",
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
)

/* const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.0),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
})) */

export default function SideBar({ children }) {
  const theme = useTheme()
  const currentUser = useCurrentUser()
  const router = useRouter()
  const [spacesQuery] = useQuery(getSpaces, {})
  const [open, setOpen] = React.useState(false)
  const [organizationCollapse, setOrganizationCollapse] = React.useState(false)
  const [libraryCollapse, setLibraryCollapse] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [spaces, setSpaces] = React.useState<Space[]>(spacesQuery.spaces)
  const [unpublishedCollapse, setUnpublishedCollapse] = React.useState(false)

  const [spacesWithChildrenQuery] = useQuery(getSpacesWithAll, {})
  const [spacesWithChildren, setSpacesWithChildren] = React.useState(spacesWithChildrenQuery)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDrawer = () => {
    if (organizationCollapse == true && open == true) {
      setOrganizationCollapse(false)
    }
    if (libraryCollapse) {
      //
      setLibraryCollapse(!libraryCollapse)
    }
    setOpen(!open)
  }

  const handleOrganizationCollapse = () => {
    if (open !== true) {
      setOpen(true)
    }
    setOrganizationCollapse(!organizationCollapse)
  }

  const handleLibraryCollapse = () => {
    if (open !== true) {
      setOpen(true)
    }
    setLibraryCollapse(!libraryCollapse)
  }

  const handleUnpublishedCollapse = () => {
    if (open !== true) {
      setOpen(true)
    }
    setUnpublishedCollapse(!unpublishedCollapse)
  }

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        sx={{
          boxShadow: "none",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            backgroundColor: theme.palette.background.default,
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "no-wrap",
          }}
        >
          <Grid
            container
            display={"flex"}
            flexDirection="row"
            alignItems={"center"}
            xs={open ? 5 : 4}
            justifyContent="space-evenly"
            paddingRight={4}
            flexGrow={1}
          >
            {/* <Search
              sx={{
                marginRight: theme.spacing(2),
                height: "fit-content",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
            </Search> */}
            <TextField
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            ></TextField>
            <IconButton color="primary" onClick={handleMenu}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Typography color={"black"}>
              {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Guest"}
            </Typography>
          </Grid>

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
      <Drawer
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
        variant="permanent"
        open={open}
      >
        <Grid item>
          <DrawerHeader
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawer}>
              <LogoIcon />
            </IconButton>
            <IconButton
              sx={{
                display: !open ? "none" : "flex",
              }}
              onClick={handleDrawer}
            >
              {theme.direction === "rtl" ? <ChevronRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemButton onClick={handleLibraryCollapse}>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Library" />
              {libraryCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={libraryCollapse} timeout="auto" unmountOnExit>
              {spacesWithChildren.map((space, idx) => {
                return <SubMenu space={space} />
              })}
            </Collapse>
            {/* {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))} */}
          </List>
          <List>
            <ListItemButton onClick={handleUnpublishedCollapse}>
              <ListItemIcon>
                <FolderOffIcon />
              </ListItemIcon>
              <ListItemText primary="Unpublished" />
              {unpublishedCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={unpublishedCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Archive />
                  </ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item>
          <List>
            <ListItemButton onClick={handleOrganizationCollapse}>
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText primary="Organization" />
              {!organizationCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={organizationCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="General" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText primary="Team" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Payment />
                  </ListItemIcon>
                  <ListItemText primary="Billing" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Grid>
      </Drawer>
      {children}
    </Box>
  )
}
