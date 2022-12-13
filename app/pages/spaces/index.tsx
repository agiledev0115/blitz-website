import {
  Add,
  ArrowDropDown,
  ArrowUpward,
  FilterAlt,
  Folder,
  FormatListBulleted,
  InsertDriveFile,
  MoreVert,
  Search,
  ViewKanban,
  ArrowRight,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Chip,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { SpaceCard } from "app/core/components/SpaceCard"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Image, useMutation, useQuery } from "blitz"
import React from "react"
import { Suspense, useState } from "react"
import GridViewIcon from "@mui/icons-material/GridView"
import { FormContainer, SelectElement } from "react-hook-form-mui"
import { SectionCard } from "app/core/components/LibraryCards/SectionCard"
import { TopicCard } from "app/core/components/LibraryCards/TopicCard"
import createSpace from "app/spaces/mutations/createSpace"
import Filter from "app/core/components/Filter"
import FolderIcon from "@mui/icons-material/Folder"
import ArchiveIcon from "@mui/icons-material/Archive"
import EditIcon from "@mui/icons-material/Edit"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import ViewKanbanIcon from "@mui/icons-material/ViewKanban"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import getSpaces from "app/spaces/queries/getSpaces"
import getTopicsWithSections from "app/topics/queries/getTopicsWithSections"
import MaterialTable from "material-table"
import { SelectionState } from "draft-js"

const LibraryView = () => {
  const [spaceQuery, { refetch: refetchSpaceQuery }] = useQuery(getSpaces, {})
  const [topicsQuery, { refetch: refetchTopicsQuery }] = useQuery(getTopicsWithSections, {})
  const [viewToggle, setViewToggle] = React.useState<string | null>("grid")
  const [selectValue, setSelectValue] = React.useState<string>("")
  const [newSpaceDialog, setNewSpaceDialog] = React.useState<boolean>(false)
  const [newSpaceName, setNewSpaceName] = React.useState<string>("")
  const [createSpaceMutation] = useMutation(createSpace)

  const handleViewToggle = (event: React.MouseEvent<HTMLElement>, newViewToggle: string | null) => {
    if (newViewToggle !== null) {
      setViewToggle(newViewToggle)
    }
  }

  console.log("spaceQuery", spaceQuery)
  console.log("topicsQuery", topicsQuery)

  const rawTopicData = [...topicsQuery.topics, ...topicsQuery.sections]
  console.log("raw data", rawTopicData)

  return (
    <Grid container padding={2} marginTop={"64px"} paddingX={8} direction={"row"}>
      <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h6" fontWeight={"600"} color="textPrimary">
          Workspaces
        </Typography>
        <Button variant="contained" onClick={() => setNewSpaceDialog(true)} startIcon={<Add />}>
          New Workspace
        </Button>
      </Grid>
      <Dialog
        open={newSpaceDialog}
        onClose={() => {
          setNewSpaceDialog(false)
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
              <Typography variant="h6">New Workspace</Typography>
            </Grid>
            <Grid paddingTop={1} item>
              <TextField
                fullWidth
                size="small"
                value={newSpaceName}
                onChange={(e) => {
                  setNewSpaceName(e.target.value)
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
                  setNewSpaceDialog(false)
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
                    await createSpaceMutation({ name: newSpaceName })
                    refetchSpaceQuery()
                    setNewSpaceDialog(false)
                  } catch (err) {
                    alert(`Creating workspace errored out with ${err} `)
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
      {spaceQuery.spaces.length === 0 && (
        <Grid container display="flex" flexDirection="column" item xs={12} paddingY={4}>
          <Grid item>
            <Image src={"/workspaceEmpty.svg"} height={"128px"} width={"128px"} />
          </Grid>
          <Grid item>
            <Typography fontSize={"20px"} fontWeight={500}>
              Get Started by Creating a Workspace
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={"16px"} fontWeight={400}>
              Workspaces are where you compile and structure knowledge about different areas or
              teams of your organization. Once you have workspaces, you can access them here.
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container paddingTop={2} direction={"row"} spacing={2} xs={12}>
        {spaceQuery.spaces.length > 0 &&
          spaceQuery?.spaces.map((space) => {
            return (
              <Grid item key={"spaceCard" + space.id}>
                <SpaceCard refetch={refetchSpaceQuery} space={space} />
              </Grid>
            )
          })}
      </Grid>
      <Grid container display={"flex"} justifyContent={"space-between"} paddingTop={2} xs={12}>
        <Grid item>
          <Typography variant="h6" fontWeight={"600"} color="textPrimary">
            All Files
          </Typography>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={viewToggle}
            exclusive
            onChange={handleViewToggle}
            aria-label="list view toggle"
          >
            <ToggleButton value="grid" aria-label="left aligned">
              <GridViewIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="centered">
              <FormatListBulleted />
            </ToggleButton>
          </ToggleButtonGroup>
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
                  filterType: "desc",
                },
                {
                  label: "Last Created",
                  filterType: "asc",
                },
                {
                  label: "Last Modified",
                  filterType: "desc",
                },
                {
                  label: "Last Modified",
                  filterType: "asc",
                },
                {
                  label: "Alphabetical",
                  filterType: "desc",
                },
                {
                  label: "Alphabetical",
                  filterType: "asc",
                },
              ]}
              variant="sortBy"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item paddingTop={2}>
        <Typography variant="body1" fontWeight={"500"}>
          74 search results found
        </Typography>
      </Grid>
      {viewToggle == "grid" ? (
        <Grid
          paddingTop={2}
          container
          spacing={2}
          xs={12}
          direction="row"
          overflow="scroll"
          height={"300px"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Grid item>
            <SectionCard
              section={{
                id: 1,
                createdAt: new Date(),
                description: "Test description",
                updatedAt: new Date(),
                title: "Test Section 1",
                status: "DRAFT",
                tags: ["test1", "api", "docs"],

                topicId: 1,
              }}
            />
          </Grid>
          <Grid item>
            <SectionCard
              section={{
                id: 1,
                createdAt: new Date(),
                description: "Test description",
                updatedAt: new Date(),
                title: "Test Section 1",
                status: "DRAFT",
                tags: ["test1", "api", "docs"],
                topicId: 1,
              }}
            />
          </Grid>
          <Grid item>
            <SectionCard
              section={{
                id: 1,
                createdAt: new Date(),
                description: "Test description",
                updatedAt: new Date(),
                title: "Test Section 1",
                status: "DRAFT",
                tags: ["test1", "api", "docs"],
                topicId: 1,
              }}
            />
          </Grid>
          <Grid item>
            <SectionCard
              section={{
                id: 1,
                createdAt: new Date(),
                description: "Test description",
                updatedAt: new Date(),
                title: "Test Section 1",
                status: "DRAFT",
                tags: ["test1", "api", "docs"],
                topicId: 1,
              }}
            />
          </Grid>
          <Grid item>
            <SectionCard
              section={{
                id: 1,
                createdAt: new Date(),
                description: "Test description",
                updatedAt: new Date(),
                title: "Test Section 1",
                status: "DRAFT",
                tags: ["test1", "api", "docs"],
                topicId: 1,
              }}
            />
          </Grid>
          <Grid item>
            <TopicCard
              topic={{
                id: 1,
                createdAt: new Date(),
                description: "Test description",
                updatedAt: new Date(),
                status: "PUBLISHED",
                name: "Test Section 1",
                tags: ["test1", "api", "docs"],
                spaceId: 1,
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid item paddingTop={2} xs={12}>
          {/* <CustomTable data={draftsQuery} /> */}
          <MaterialTable
            style={{
              paddingRight: 10,
            }}
            icons={{
              //@ts-ignore
              DetailPanel: () => <ArrowRight />,
            }}
            components={{
              Container: (props) => (
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: "#FAFAFA",
                  }}
                  {...props}
                ></Paper>
              ),
            }}
            data={rawTopicData}
            columns={[
              {
                title: "Name",
                render: (rowData: any) => {
                  if (rowData.name && rowData.spaceId) {
                    // topic
                    return (
                      <Grid
                        item
                        display={"flex"}
                        alignItems="center"
                        sx={{ opacity: rowData.status == "DRAFT" ? "50%" : "100%" }}
                      >
                        <ViewKanban htmlColor="#304FFE" fontSize="large" />
                        <Typography variant="h6" fontWeight={500} paddingLeft={2} fontSize={16}>
                          {rowData.name}
                        </Typography>
                      </Grid>
                    )
                  } else {
                    // section
                    return (
                      <Grid
                        item
                        display={"flex"}
                        alignItems="center"
                        sx={{ opacity: rowData.status == "DRAFT" ? "50%" : "100%" }}
                      >
                        <InsertDriveFile htmlColor="#26A69A" fontSize="large" />
                        <Typography variant="h6" fontWeight={500} paddingLeft={2} fontSize={16}>
                          {rowData.title}
                        </Typography>
                      </Grid>
                    )
                  }
                },
              },
              {
                title: "Tags",
                align: "right",
                render: (rowData) => {
                  return rowData.tags.map((tag, idx) => {
                    return (
                      <Chip
                        key={tag + idx}
                        label={tag}
                        color={"info"}
                        sx={{
                          marginRight: "5px",
                          backgroundColor:
                            rowData.status == "DRAFT" ? "rgba(2, 136, 209, 0.4)" : "info",
                        }}
                      />
                    )
                  })
                },
              },
              {
                title: "Archived at",
                align: "right",
                render: (rowData) => {
                  return (
                    <Typography
                      fontSize={14}
                      sx={{ opacity: rowData.status == "DRAFT" ? "50%" : "100%" }}
                    >
                      {rowData.updatedAt.toDateString()}
                    </Typography>
                  )
                },
              },
              {
                title: "Contains",
                field: "contains",
                align: "right",
                render: (rowData) => {
                  if (rowData.sections)
                    return (
                      <Typography
                        fontSize={14}
                        sx={{ opacity: rowData.status == "DRAFT" ? "50%" : "100%" }}
                      >
                        {rowData.sections.length + " sections"}
                      </Typography>
                    )
                },
              },
            ]}
            actions={[
              {
                icon: MoreVert,
                tooltip: "Options",
                onClick: (event, rowData) => console.log("test"),
              },
            ]}
            localization={{
              header: {
                actions: "",
              },
            }}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#FAFAFA",
              },
              search: false,
              showTitle: false,
              paging: false,
              rowStyle: {
                height: "88px",
              },
            }}
          />
        </Grid>
      )}
    </Grid>
  )
}

const LibraryPage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <LibraryView />
    </Suspense>
  )
}

LibraryPage.getLayout = (page) => <Layout>{page}</Layout>

export default LibraryPage
