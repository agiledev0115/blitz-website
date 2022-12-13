import React, { Suspense, useState } from "react"
import {
  AddCircle,
  SearchRounded,
  ArrowForward,
  FilterAlt,
  Search,
  MoreVert,
  Add,
  Label,
  Link,
  DriveFileRenameOutline,
  Archive,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material"
import { Block } from "@prisma/client"
import db from "db"
import { useMutation, useQuery, useRouter, BlitzPage, useParam, useParams, Image } from "blitz"
import createBlock from "app/blocks/mutations/createBlock"
import getBlocks from "app/blocks/queries/getBlocks"
import RichEditor from "app/core/components/RichEditor"
import IFrame from "app/core/components/IFrame"
import Gallery from "app/core/components/ImageViewer"
import ReactPlayer from "react-player"
import GoogleDocsViewer from "app/core/components/GoogleDocs"
import Layout from "app/core/layouts/Layout"
import { FormContainer, SelectElement, TextFieldElement } from "react-hook-form-mui"
import Topic from "app/core/components/Topic"
import getSpaceWithAll from "app/spaces/queries/getSpaceWithAll"
import getTopic from "app/topics/queries/getTopic"
import createTopic from "app/topics/mutations/createTopic"
import getTopics from "app/topics/queries/getTopics"
import Filter from "app/core/components/Filter"

import FolderIcon from "@mui/icons-material/Folder"
import ArchiveIcon from "@mui/icons-material/Archive"
import EditIcon from "@mui/icons-material/Edit"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import ViewKanbanIcon from "@mui/icons-material/ViewKanban"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import Masonry from "@mui/lab/Masonry"

const SpaceView: React.FC = () => {
  const id = useParam("spaceId", "number")
  const [spaceQuery] = useQuery(getSpaceWithAll, { id })
  const [createTopicMutation] = useMutation(createTopic)
  const [topicQuery, { refetch: refetchTopicQuery }] = useQuery(getTopics, {})

  const [searchOpen, setSearchOpen] = React.useState<boolean>(false)
  const [selectValue, setSelectValue] = React.useState<string>("")
  const [topicDialog, setTopicDialog] = React.useState<boolean>(false)
  const [newTopicName, setNewTopicName] = React.useState<string>("")

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid container padding={2} marginTop={"64px"} paddingX={8} direction={"row"}>
      <Grid container item xs={12}>
        <Grid container item spacing={3} alignItems="center" justifyContent={"space-between"}>
          <Grid container item alignItems="center" width={"auto"}>
            <Grid item>
              <Typography variant={"h4"}>{spaceQuery.name}</Typography>
            </Grid>
            <Grid item>
              {spaceQuery.tags.map((tag, idx) => {
                return (
                  <Chip
                    key={"tag" + tag + idx}
                    label={tag}
                    color={"info"}
                    sx={{
                      marginRight: "5px",
                    }}
                  />
                )
              })}
            </Grid>
            <Grid item>
              <IconButton sx={{ paddingBottom: "0" }} onClick={handleClick}>
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
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  style: {
                    /* maxHeight: ITEM_HEIGHT * 4.5, */
                    width: "20ch",
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    console.log("Insert routing")
                    //navigator.clipboard.writeText(`http://localhost:3000/spaces/${space.id}`)
                  }}
                >
                  <Link sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Get Link
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <DriveFileRenameOutline sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Rename
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Label sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Edit Tags
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Archive sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
                  Archive
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <Grid container width={"auto"} paddingTop={3}>
            <Button variant="contained" onClick={() => setTopicDialog(true)} startIcon={<Add />}>
              Add Topic
            </Button>
          </Grid>
        </Grid>
        <Grid container paddingTop={2} rowSpacing={1} xs={12}>
          <Grid item xs={7}>
            <TextField
              id="input-with-icon-textfield"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              placeholder="Enter keywords"
            />
          </Grid>
          <Grid
            container
            item
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            xs={12}
          >
            <Grid container xs={7} item display={"flex"} alignItems="center" direction="row">
              <Typography fontWeight={"500"} variant="body2">
                Filters
              </Typography>
              <FilterAlt
                sx={{
                  paddingRight: 1,
                }}
              />
              <Grid item paddingLeft={2} paddingRight={1}>
                <Filter
                  mainLabel={"Type"}
                  menuItems={[
                    {
                      label: "Topic",
                      icon: <ViewKanbanIcon fontSize="medium" sx={{ color: "#304FFE" }} />,
                    },
                    {
                      label: "Section",
                      icon: <InsertDriveFileIcon fontSize="medium" sx={{ color: "#26A69A" }} />,
                    },
                  ]}
                  variant="default"
                />
              </Grid>
              <Grid item paddingRight={1}>
                <Filter
                  mainLabel={"Tags"}
                  menuItems={[
                    {
                      label: "Menu Item",
                    },
                    {
                      label: "Menu Item 2",
                    },
                    {
                      label: "Menu Item 3",
                    },
                    {
                      label: "Menu Item 4",
                    },
                    {
                      label: "Menu Item 5",
                    },
                  ]}
                  variant="default"
                />
              </Grid>
              <Grid item paddingRight={1}>
                <Filter
                  mainLabel={"Last Modified"}
                  menuItems={[
                    {
                      label: "Label",
                    },
                  ]}
                  variant="default"
                />
              </Grid>
              <Grid item paddingRight={1}>
                <Filter
                  mainLabel={"Status"}
                  menuItems={[
                    {
                      label: "Published",
                      icon: <LibraryBooksIcon />,
                    },
                    {
                      label: "Draft",
                      icon: <EditIcon />,
                    },
                    {
                      label: "Archived",
                      icon: <ArchiveIcon />,
                    },
                  ]}
                  variant="default"
                />
              </Grid>
              <Grid item paddingRight={1}>
                <Filter
                  mainLabel={"Location"}
                  menuItems={[
                    {
                      label: "Workspace 1",
                      icon: <FolderIcon sx={{ color: "#1A237E" }} />,
                    },
                    {
                      label: "Workspace 2",
                      icon: <FolderIcon sx={{ color: "#FFA000" }} />,
                    },
                    {
                      label: "Workspace 3",
                      icon: <FolderIcon sx={{ color: "#F44336" }} />,
                    },
                    {
                      label: "Workspace 4",
                      icon: <FolderIcon sx={{ color: "#03A9F4" }} />,
                    },
                  ]}
                  variant="default"
                />
              </Grid>
            </Grid>
            <Grid item display={"flex"} direction="row" alignItems={"center"}>
              <Filter
                mainLabel={"Last Created"}
                menuItems={[
                  {
                    label: "Last Created",
                    icon: <ArrowDownwardIcon />,
                  },
                  {
                    label: "Last Created",
                    icon: <ArrowUpwardIcon />,
                  },
                  {
                    label: "Last Modified",
                    icon: <ArrowDownwardIcon />,
                  },
                  {
                    label: "Last Modified",
                    icon: <ArrowUpwardIcon />,
                  },
                  {
                    label: "Alphabetical",
                    icon: <ArrowDownwardIcon />,
                  },
                  {
                    label: "Alphabetical",
                    icon: <ArrowUpwardIcon />,
                  },
                ]}
                variant="sortBy"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={topicDialog}
        onClose={() => {
          setTopicDialog(false)
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
              <Typography variant="h6">Add Topic</Typography>
            </Grid>
            <Grid paddingTop={1} item>
              <TextField
                fullWidth
                size="small"
                value={newTopicName}
                onChange={(e) => {
                  setNewTopicName(e.target.value)
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
                  setTopicDialog(false)
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
                    await createTopicMutation({ name: newTopicName, spaceId: id as number })
                    refetchTopicQuery()
                    setTopicDialog(false)
                  } catch (err) {
                    alert(`Creating topic errored out with ${err} `)
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
      {spaceQuery.topics.length === 0 && (
        <Grid container display="flex" flexDirection="column" item xs={12} paddingY={4}>
          <Grid item>
            <Image src={"/workspaceEmpty.svg"} height={"128px"} width={"128px"} />
          </Grid>
          <Grid item>
            <Typography fontSize={"20px"} fontWeight={500}>
              This Workspace Has No Content Yet
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={"16px"} fontWeight={400}>
              Create topics to document knowledge. Topics consists of multiple sections, which
              contain bite-sized pieces of information.
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} paddingY={4}>
        <Masonry columns={3} spacing={2}>
          {spaceQuery.topics.map((el, idx) => {
            return (
              <Grid item xs={4} key={idx}>
                <Topic data={el} />
              </Grid>
            )
          })}
        </Masonry>
      </Grid>
    </Grid>
  )
}

const SpacePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <SpaceView />
    </Suspense>
  )
}

SpacePage.getLayout = (page) => <Layout>{page}</Layout>

export default SpacePage
