import React from "react"
import {
  Archive,
  DriveFileRenameOutline,
  FileCopy,
  FileOpen,
  Folder,
  Label,
  MoreVert,
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
  Menu,
  MenuItem,
  Dialog,
  Button,
  TextField,
} from "@mui/material"
import { Space } from "@prisma/client"
import getSections from "app/sections/queries/getSections"
import getSectionsFromTopics from "app/sections/queries/getSectionsFromTopics"
import deleteSpace from "app/spaces/mutations/deleteSpace"
import getTopics from "app/topics/queries/getTopics"
import { useQuery, useMutation, Router } from "blitz"
import updateSpace from "app/spaces/mutations/updateSpace"

interface SpaceCardProps {
  space: Space
  refetch: () => void
}

export const SpaceCard: React.FunctionComponent<SpaceCardProps> = ({ space, refetch }) => {
  const [topicQuery] = useQuery(getTopics, { where: { spaceId: space.id } })
  const [sectionQuery] = useQuery(getSectionsFromTopics, topicQuery?.topics)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [renameDialog, setRenameDialog] = React.useState<boolean>(false)
  const [newName, setNewName] = React.useState<string>(space.name)
  const [updateSpaceMutation] = useMutation(updateSpace)
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
        backgroundColor: space.status == "DRAFT" ? "rgba(2, 136, 209, 0.04)" : "#E3F2FD",
        borderRadius: "4px",
        height: "200px",
        maxWidth: "220px",
        width: "%100",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Grid
            xs={12}
            container
            display={"flex"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
              <Grid item display={"flex"} alignItems={"center"}>
                <Folder htmlColor="#455A64" fontSize="medium" />
                <Typography fontSize={"14px"} paddingLeft={"5px"} fontWeight={"300"}>
                  Workspace
                </Typography>
                {space.status == "DRAFT" && (
                  <Chip
                    size="small"
                    label={space.status}
                    color={space.status !== "DRAFT" ? "success" : "info"}
                    sx={{
                      marginRight: "2%",
                    }}
                  />
                )}
              </Grid>
              <Grid item>
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
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
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose()
                      Router.push(`/spaces/${space.id}`)
                    }}
                  >
                    <FileOpen sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                    Open
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:3000/spaces/${space.id}`)
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
                          value={newName}
                          onChange={(e) => {
                            setNewName(e.target.value)
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
                              await updateSpaceMutation({ id: space.id, name: newName })
                              refetch()
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
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"flex-start"}
              width="200"
              sx={{
                overflowX: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {space.tags.map((tag, idx) => {
                return (
                  <Chip
                    key={"tag" + idx}
                    label={tag}
                    color={space.status !== "DRAFT" ? "success" : "info"}
                    sx={{
                      marginRight: "5px",
                    }}
                  />
                )
              })}
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={18} fontWeight={"700"}>
                {space.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography paddingRight={3} variant="caption">
                {topicQuery.topics.length} Topics
              </Typography>
              <Typography variant="caption">{sectionQuery.sections.length} Sections</Typography>
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
