import {
  Archive,
  ArrowDropDown,
  ArrowRight,
  DriveFileMove,
  DriveFileRenameOutline,
  Edit,
  FileCopy,
  FilterAlt,
  Folder,
  InsertDriveFile,
  Label,
  LibraryBooks,
  Link,
  RemoveRedEye,
  Search,
  ViewKanban,
} from "@mui/icons-material"
import MoreVert from "@mui/icons-material/MoreVert"
import {
  Button,
  Chip,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import Filter from "app/core/components/Filter"
import CustomTable from "app/core/components/Table"
import Layout from "app/core/layouts/Layout"
import getAllSpacesWithAll from "app/spaces/queries/getAllSpacesWithAll"
import { BlitzPage, Image, useQuery } from "blitz"
import MaterialTable, { MTableHeader } from "material-table"
import React, { ForwardRefExoticComponent, RefAttributes, Suspense } from "react"

const DraftsView: React.FC = () => {
  const [selectValue, setSelectValue] = React.useState("")
  const [draftsQuery] = useQuery(getAllSpacesWithAll, {})

  const rawData = [...draftsQuery.spaces, ...draftsQuery.topics, ...draftsQuery.sections]
  console.log("draftsQuery", rawData)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  console.log(draftsQuery)

  return (
    <Grid container padding={2} marginTop={"64px"} paddingX={8} xs={12}>
      <Grid container item>
        <Grid item>
          <Typography variant="h4">Drafts</Typography>
        </Grid>
        <Grid container item paddingTop={2} rowSpacing={1} xs={12}>
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
                      icon: <ViewKanban fontSize="medium" sx={{ color: "#304FFE" }} />,
                    },
                    {
                      label: "Section",
                      icon: <InsertDriveFile fontSize="medium" sx={{ color: "#26A69A" }} />,
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
                      icon: <LibraryBooks />,
                    },
                    {
                      label: "Draft",
                      icon: <Edit />,
                    },
                    {
                      label: "Archived",
                      icon: <Archive />,
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
                      icon: <Folder sx={{ color: "#1A237E" }} />,
                    },
                    {
                      label: "Workspace 2",
                      icon: <Folder sx={{ color: "#FFA000" }} />,
                    },
                    {
                      label: "Workspace 3",
                      icon: <Folder sx={{ color: "#F44336" }} />,
                    },
                    {
                      label: "Workspace 4",
                      icon: <Folder sx={{ color: "#03A9F4" }} />,
                    },
                  ]}
                  variant="default"
                />
              </Grid>
            </Grid>
            <Grid item display={"flex"} direction="row" alignItems={"center"}>
              <Typography fontWeight={"500"} variant="body2">
                Sort by
              </Typography>
              <Select autoWidth variant="standard" label="Last Modified"></Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {draftsQuery.sections.length > 0 ||
      draftsQuery.topics.length > 0 ||
      draftsQuery.spaces.length > 0 ? (
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
            data={rawData}
            parentChildData={(row, rows) =>
              rows.find((el) => {
                if (row.spaceId) {
                  return row.spaceId === el.id && !el.spaceId && !el.topicId
                }
                if (row.topicId) {
                  return row.topicId === el.id && el.spaceId
                }
              })
            }
            columns={[
              {
                title: "Name",
                render: (rowData: any) => {
                  if (rowData.name && !rowData.spaceId) {
                    return (
                      <Grid item display={"flex"} alignItems="center">
                        <Folder htmlColor="#455A64" fontSize="large" />
                        <Typography variant="h6" fontWeight={500}>
                          {rowData.name}
                        </Typography>
                      </Grid>
                    )
                  } else if (rowData.name && rowData.spaceId) {
                    return (
                      <Grid paddingLeft={2} item display={"flex"} alignItems="center">
                        <ViewKanban htmlColor="#304FFE" fontSize="large" />
                        <Typography variant="h6" fontWeight={500}>
                          {rowData.name}
                        </Typography>
                      </Grid>
                    )
                  } else {
                    return (
                      <Grid paddingLeft={4} item display={"flex"} alignItems="center">
                        <InsertDriveFile htmlColor="#26A69A" fontSize="large" />
                        <Typography variant="h6" fontWeight={500}>
                          {rowData.title}
                        </Typography>
                      </Grid>
                    )
                  }
                },
              },
              {
                title: "Tags",
                render: (rowData) => {
                  return rowData.tags.map((tag, idx) => {
                    return (
                      <Chip
                        key={tag + idx}
                        label={tag}
                        color={rowData.status !== "DRAFT" ? "success" : "info"}
                        sx={{
                          marginRight: "5px",
                        }}
                      />
                    )
                  })
                },
              },
              {
                title: "Archived at",
                render: (rowData) => rowData.updatedAt.toDateString(),
              },
              { title: "Contains", field: "contains" },
            ]}
            actions={[
              {
                icon: MoreVert,
                tooltip: "Options",
                onClick: handleClick,
              },
            ]}
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
            <MenuItem onClick={handleClose}>
              <RemoveRedEye sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
              View
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Edit sx={{ color: "rgba(0, 0, 0, 0.54)", marginRight: 2 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log("Insert routing")
                //navigator.clipboard.writeText(`http://localhost:3000/spaces/${space.id}/topics/$(topic.id)/${section.id}`)
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
      ) : (
        <Grid container display="flex" flexDirection="column" item xs={12} paddingY={4}>
          <Grid item>
            <Image src={"/workspaceEmpty.svg"} height={"128px"} width={"128px"} />
          </Grid>
          <Grid item>
            <Typography fontSize={"20px"} fontWeight={500}>
              No Drafts Yet
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={"16px"} fontWeight={400}>
              Workspaces and topics without content and sections you are editing are automatically
              changed to drafts until published. You can find all of your drafts here.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

const DraftsPage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <DraftsView />
    </Suspense>
  )
}

DraftsPage.getLayout = (page) => <Layout>{page}</Layout>

export default DraftsPage
