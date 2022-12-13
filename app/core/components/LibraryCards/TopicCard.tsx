import {
  Archive,
  DriveFileMove,
  DriveFileRenameOutline,
  Edit,
  FileCopy,
  Folder,
  FolderOpen,
  InsertDriveFile,
  Label,
  MoreVert,
  RemoveRedEye,
  ViewKanban,
  Link,
} from "@mui/icons-material"
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material"
import { Section, Space, Topic } from "@prisma/client"
import getSections from "app/sections/queries/getSections"
import getSectionsFromTopics from "app/sections/queries/getSectionsFromTopics"
import getTopics from "app/topics/queries/getTopics"
import { useQuery } from "blitz"
import React from "react"

interface TopicCardProps {
  topic: Topic
}

export const TopicCard: React.FunctionComponent<TopicCardProps> = ({ topic }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: "4px",
        height: "215px",
        maxWidth: "210px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          backgroundImage: 'url("/insertDriveFile.svg")',
          backgroundSize: "150px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CardContent
          sx={{
            padding: "12px",
            paddingBottom: 0,
          }}
        >
          <Grid
            xs={12}
            container
            display={"flex"}
            direction={"column"}
            justifyContent={"space-between"}
          >
            <Grid item container xs={12} display={"flex"} justifyContent={"space-between"}>
              <Grid item display={"flex"} alignItems={"center"}>
                <ViewKanban htmlColor="#304FFE" fontSize="large" />
                <Typography variant="body1" paddingLeft={"5px"} fontWeight={"300"}>
                  Topic
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
              </Grid>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    /* maxHeight: ITEM_HEIGHT * 4.5, */
                    width: "24ch",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <FolderOpen sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Open file location
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose()
                    //Router.push(`/spaces/${space.id}`)
                  }}
                >
                  <RemoveRedEye sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  View
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Edit sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    //navigator.clipboard.writeText(`http://localhost:3000/spaces/${space.id}`)
                  }}
                >
                  <Link sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Get Link
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    //setRenameDialog(true)
                    handleClose()
                  }}
                >
                  <DriveFileRenameOutline sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Rename
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Label sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Edit Tags
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <FileCopy sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Duplicate
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <DriveFileMove sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Move
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Archive sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Archive
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent
          sx={{
            paddingBottom: 0,
            paddingTop: 1,
          }}
        >
          <Grid item container xs={12} display={"flex"} justifyContent={"flex-start"}>
            <Grid item xs={12}>
              <Typography variant="caption">Workspace Name</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{topic.name}</Typography>
            </Grid>
            <Grid item xs={12} marginBottom={1}>
              {topic.tags.map((tag, idx) => {
                return (
                  <Chip
                    key={"tag" + idx}
                    label={tag}
                    color={"info"}
                    sx={{
                      marginRight: "5px",
                    }}
                  />
                )
              })}
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Typography marginTop={1} variant="body1">
                17
              </Typography>
              <Typography variant="caption">Sections</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  )
}
