import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import FolderIcon from "@mui/icons-material/Folder"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ViewKanbanIcon from "@mui/icons-material/ViewKanban"
import { Section, Topic, Space as SpaceType } from "@prisma/client"
import React from "react"
import MenuItem from "@mui/material/MenuItem"
import { Menu, Stack } from "@mui/material"
import { useRouter } from "blitz"

interface SubMenu {
  space: SpaceType & {
    topics?: Topic[] & {
      sections?: Section[]
    }
  }
}

const SubMenu: React.FC<SubMenu> = ({ space }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const ref = React.useRef<any>()
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSpace = () => {
    console.log("router", router)
    router.push(`/spaces/${space.id}`)
  }

  React.useEffect(() => {
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handleClose()
    }

    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [open])

  return (
    <List component={Stack} direction="row" ref={ref} key={"submenu_space" + space.id}>
      <ListItemButton
        key={"space" + space.id}
        sx={{
          pl: 4,
          pr: 0,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.00)",
          },
        }}
        onClick={handleSpace}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={space.name} sx={{ overflowX: "hidden" }} /> {/*Overflow here!*/}
        <ListItemIcon
          sx={{ justifyContent: "center", alignItems: "center", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation()
            handleClick(e)
          }}
        >
          <ChevronRightIcon />
        </ListItemIcon>
      </ListItemButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {space.topics?.map((topic: Topic, idx) => (
          <MenuItem onClick={() => {}} key={"submenu_item" + idx}>
            <ListItemIcon sx={{ paddingRight: "16px" }}>
              <ViewKanbanIcon fontSize="medium" sx={{ color: "#304FFE" }} />
            </ListItemIcon>
            <ListItemText>{topic.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </List>
  )
}

export default SubMenu
