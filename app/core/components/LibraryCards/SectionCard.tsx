import React from "react"
import {
  Archive,
  DriveFileRenameOutline,
  FileCopy,
  FileOpen,
  Folder,
  InsertDriveFile,
  Label,
  MoreVert,
  Link,
  FolderOpen,
  RemoveRedEye,
  Edit,
  DriveFileMove,
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
  Button,
  Dialog,
  TextField,
} from "@mui/material"
import { Section, Space } from "@prisma/client"
import getSections from "app/sections/queries/getSections"
import getSectionsFromTopics from "app/sections/queries/getSectionsFromTopics"
import getTopics from "app/topics/queries/getTopics"
import { Router, useQuery, useMutation } from "blitz"
import updateSection from "app/sections/mutations/updateSection"

interface SectionCardProps {
  section: Section
  refetch?: () => void
}

export const SectionCard: React.FunctionComponent<SectionCardProps> = ({ section, refetch }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [renameDialog, setRenameDialog] = React.useState<boolean>(false)
  const [newTitle, setNewTitle] = React.useState<string>(section.title)
  const [updateSectionMutation] = useMutation(updateSection)
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
                <InsertDriveFile htmlColor="#26A69A" fontSize="large" />
                <Typography variant="body1" paddingLeft={"5px"} fontWeight={"300"}>
                  Section
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
                    setRenameDialog(true)
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
              <Dialog
                open={renameDialog}
                onClose={() => {
                  setRenameDialog(false)
                }}
              >
                <Grid container display="flex" justifyContent="center">
                  <Grid
                    container
                    item
                    flexDirection="column"
                    display="flex"
                    justifyContent="space-between"
                    padding={2}
                  >
                    <Grid item textAlign="start">
                      <Typography variant="h6">Rename Workspace</Typography>
                    </Grid>
                    <Grid paddingTop={1} item>
                      <TextField
                        fullWidth
                        size="small"
                        value={newTitle}
                        onChange={(e) => {
                          setNewTitle(e.target.value)
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    padding={2}
                    paddingTop={0}
                    flexDirection="row"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Grid item>
                      <Button
                        onClick={() => {
                          setRenameDialog(false)
                        }}
                        variant="text"
                      >
                        CANCEL
                      </Button>
                    </Grid>
                    <Grid item paddingLeft={1}>
                      <Button
                        onClick={async () => {
                          try {
                            await updateSectionMutation({ id: section.id, title: newTitle })
                            if (refetch) refetch() // Modified
                            setRenameDialog(false)
                          } catch (err) {
                            alert(`Renaming workspace errored out with ${err} `)
                          }
                        }}
                        variant="contained"
                      >
                        OKAY
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Dialog>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid item container xs={12} display={"flex"} justifyContent={"flex-start"}>
            <Grid item marginBottom={1}>
              {section.tags.map((tag, idx) => {
                return (
                  <Chip
                    key={"tag" + idx}
                    label={tag}
                    color={section.status !== "DRAFT" ? "success" : "info"}
                    sx={{
                      marginRight: "5px",
                    }}
                  />
                )
              })}
            </Grid>
            <Grid item>
              <Divider />
              <Typography marginTop={1} variant="body1">
                {section.title}
              </Typography>
              <Typography variant="caption">Works.../ Very Long Topic Na...</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
      {/* <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography fontWeight={"700"} variant={"h5"} color="#404B5A">
            {space.name}
          </Typography>
          <Typography color="#434343" paddingTop={2}>
            {space.description}
          </Typography>
          <Chip
            label={space.status}
            color={space.status !== "DRAFT" ? "success" : "info"}
            sx={{
              marginTop: "16px",
            }}
          />
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography color="#6E7A89">{3}</Typography>
          <Typography color="#6E7A89" fontWeight={"700"}>
            Items
          </Typography>
        </CardContent>
      </Box> */}
    </Card>
  )
}
