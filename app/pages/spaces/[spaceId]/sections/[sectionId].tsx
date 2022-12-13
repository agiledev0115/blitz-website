import React, { Suspense } from "react"
import {
  AddBox,
  AddCircle,
  ArrowBack,
  ArrowDownward,
  ArrowUpward,
  Code,
  Delete,
  DriveFileMove,
  FileCopy,
  Image,
  InsertDriveFile,
  MoreVert,
  Redo,
  TextFields,
  Undo,
  VideoLibrary,
} from "@mui/icons-material"
import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import { Block } from "@prisma/client"
import db from "db"
import { useMutation, useQuery, useRouter, BlitzPage, useParam, useParams } from "blitz"
import createBlock from "app/blocks/mutations/createBlock"
import getBlocks from "app/blocks/queries/getBlocks"
import RichEditor from "app/core/components/RichEditor"
import IFrame from "app/core/components/IFrame"
import Gallery from "app/core/components/ImageViewer"
import ReactPlayer from "react-player"
import GoogleDocsViewer from "app/core/components/GoogleDocs"
import Layout from "app/core/layouts/Layout"
import Topic from "app/core/components/Topic"

/* const SectionView = () => {
  const params = useParams()
  console.log(params)
  const sectionId = useParam("id", "number")
  const [createBlockMutation] = useMutation(createBlock)
  const [blockQuery] = useQuery(getBlocks, {
    where: {
      sectionId,
    },
  })
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)
  const [blocks, setBlocks] = React.useState<Block[] | []>(blockQuery.blocks)
  const [name, setName] = React.useState<string>("")
  console.log(blockQuery)

  return (
    <Grid container xs={12} direction={"row"} paddingTop={5} height="100%">
      <Grid container xs={2} padding={3} direction="column" height="100%">
        <Grid item>
          <Card
            elevation={0}
            sx={{
              backgroundColor: "#F6F4EE",
              borderRadius: "16px",
            }}
          >
            <CardContent>
              <Typography gutterBottom fontSize="1rem" fontWeight="600" color="#6E7A89">
                Profile
              </Typography>
              <Typography fontSize="1rem" fontWeight="400" color="#434343">
                Manage your profile and password Have a product idea, suggestion or some feedback?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container xs={10} direction={"column"} paddingTop={5} flexWrap={"nowrap"}>
        <Grid container xs={12} direction={"row"} paddingTop={3}>
          <Grid item xs={12}>
            <Typography variant="h4" fontWeight={"600"}>
              Test Document
            </Typography>

            <Typography paddingTop={3} variant="body1">
              Description
            </Typography>

            <Typography paddingTop={3} variant="caption">
              Date
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} direction={"column"} paddingTop={5}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              {blocks.map((block) => {
                switch (block.type) {
                  case "text":
                    return <Typography>{block.content}</Typography>
                  case "iframe":
                    return <IFrame src={block.content} height={"500px"} width={"500px"}></IFrame>
                  case "image":
                    return <Gallery imgs={block.content} />
                  case "video":
                    return <ReactPlayer url={block.content} muted light />
                  case "googleDocs":
                    return <GoogleDocsViewer src={block.content} />
                  default:
                    return <></>
                }
              })}
            </Grid>
            <Grid item xs={12}>
              <IconButton
                onClick={() => {
                  setDialogOpen((prev) => {
                    return true
                  })
                }}
              >
                <AddCircle />
              </IconButton>
            </Grid>
            <Dialog
              open={dialogOpen}
              onClose={() => {
                setDialogOpen(false)
              }}
              fullWidth
            >
              <Grid container xs={12} direction={"row"} padding={2}>
                <Grid item xs={12} padding={2}>
                  <TextField
                    value={name}
                    label={"Name"}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} padding={2}>
                  <Button
                    onClick={async () => {
                      createBlockMutation({
                        name: name,
                        type: "text",
                        content: "",
                        sectionId: 1,
                        row: blocks.length + 1,
                      })
                      setDialogOpen(false)
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircle />}
                  >
                    Add Rich Text
                  </Button>
                </Grid>
                <Grid item xs={6} padding={2}>
                  <Button fullWidth variant="contained" color="primary" startIcon={<AddCircle />}>
                    Add Image
                  </Button>
                </Grid>
                <Grid item xs={6} padding={2}>
                  <Button fullWidth variant="contained" color="primary" startIcon={<AddCircle />}>
                    Add File
                  </Button>
                </Grid>
                <Grid item xs={6} padding={2}>
                  <Button fullWidth variant="contained" color="primary" startIcon={<AddCircle />}>
                    Add IFrame
                  </Button>
                </Grid>
              </Grid>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
} */

interface SectionViewProps {
  data: any
}

const SectionView: React.FC<SectionViewProps> = ({ data }) => {
  return (
    <Grid xs={12} spacing={1} container direction={"row"} paddingTop={2} height="100%">
      <Grid xs={3} item container display={"flex"} direction="column">
        <IconButton>
          <ArrowBack />
        </IconButton>
        <Topic data={data} />
        <Button variant="text" fullWidth startIcon={<AddCircle />}>
          Add new section
        </Button>
      </Grid>
      <Grid xs={9} item container display={"flex"} direction="column">
        <Paper elevation={3}>
          <Grid
            item
            container
            display={"flex"}
            justifyContent={"space-around"}
            direction="row"
            bgcolor={"#0288D1"}
            xs={12}
          >
            <Grid item container direction={"column"}>
              <Grid item>
                <Typography fontSize={"16px"}>
                  Editing
                  <InsertDriveFile
                    htmlColor="#26A69A"
                    sx={{
                      height: "16px",
                      width: "16px",
                    }}
                  />
                  {data.name}
                  <Chip
                    size="small"
                    label={"DRAFT"}
                    color={data.status !== "DRAFT" ? "success" : "info"}
                    sx={{
                      marginRight: "5px",
                    }}
                  />
                </Typography>
              </Grid>
              <Grid item>
                <Typography fontSize={"16px"}>
                  Library {">"} Worksp... {">"} Very very long section name
                </Typography>
              </Grid>
            </Grid>
            <Grid item display={"flex"} direction="row">
              <Typography>Draft auto saved</Typography>
              <IconButton>
                <MoreVert />
              </IconButton>
              <Button>PUBLISH</Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} display="flex" direction={"column"}>
            <Grid container item display={"flex"} justifyContent="space-between">
              <Typography>{data.name}</Typography>
              <Grid item>
                <IconButton>
                  <Undo />
                </IconButton>
                <IconButton>
                  <Redo />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item>
              <Typography>{data.description}</Typography>
            </Grid>
          </Grid>
          {data.content.map((content, index) => {
            return (
              <Grid container item xs={12}>
                <IconButton>
                  <AddBox />
                </IconButton>
                {(() => {
                  switch (content.type) {
                    case "text":
                      return (
                        <Grid container item display={"flex"}>
                          <Grid
                            item
                            container
                            xs={12}
                            display={"flex"}
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <TextFields />
                              <Typography>Rich Text Editor</Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Switch defaultChecked />}
                                  label="Building Block Visible"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item>
                              <ArrowUpward />
                              <ArrowDownward />
                              <FileCopy />
                              <DriveFileMove />
                              <Delete />
                            </Grid>
                          </Grid>

                          <Grid item>
                            <RichEditor
                              onChange={(e) => {
                                console.log(e.target.value)
                              }}
                              value={content.content}
                            />
                          </Grid>
                        </Grid>
                      )
                    case "iframe":
                      return (
                        <Grid container item display={"flex"}>
                          <Grid
                            item
                            container
                            xs={12}
                            display={"flex"}
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <Code />
                              <Typography>Embed Web Page</Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Switch defaultChecked />}
                                  label="Building Block Visible"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item>
                              <ArrowUpward />
                              <ArrowDownward />
                              <FileCopy />
                              <DriveFileMove />
                              <Delete />
                            </Grid>
                          </Grid>

                          <Grid item>
                            <IFrame src={content.content} height={"500px"} width={"500px"}></IFrame>
                          </Grid>
                        </Grid>
                      )
                    case "image":
                      return (
                        <Grid container item display={"flex"}>
                          <Grid
                            item
                            container
                            xs={12}
                            display={"flex"}
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <Image />
                              <Typography>Image</Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Switch defaultChecked />}
                                  label="Building Block Visible"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item>
                              <ArrowUpward />
                              <ArrowDownward />
                              <FileCopy />
                              <DriveFileMove />
                              <Delete />
                            </Grid>
                          </Grid>

                          <Grid item>
                            <Gallery imgs={content.content} />
                          </Grid>
                        </Grid>
                      )
                    case "video":
                      return (
                        <Grid container item display={"flex"}>
                          <Grid
                            item
                            container
                            xs={12}
                            display={"flex"}
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <VideoLibrary />
                              <Typography>Video</Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Switch defaultChecked />}
                                  label="Building Block Visible"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item>
                              <ArrowUpward />
                              <ArrowDownward />
                              <FileCopy />
                              <DriveFileMove />
                              <Delete />
                            </Grid>
                          </Grid>

                          <Grid item>
                            <ReactPlayer url={content.content} muted light />
                          </Grid>
                        </Grid>
                      )
                    case "googleDocs":
                      return (
                        <Grid container item display={"flex"}>
                          <Grid
                            item
                            container
                            xs={12}
                            display={"flex"}
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <VideoLibrary />
                              <Typography>Google Docs Viewer</Typography>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Switch defaultChecked />}
                                  label="Building Block Visible"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item>
                              <ArrowUpward />
                              <ArrowDownward />
                              <FileCopy />
                              <DriveFileMove />
                              <Delete />
                            </Grid>
                          </Grid>

                          <Grid item>
                            <GoogleDocsViewer src={content.content} />
                          </Grid>
                        </Grid>
                      )
                    default:
                      return <></>
                  }
                })()}
                <IconButton>
                  <AddBox />
                </IconButton>
              </Grid>
            )
          })}
          <Grid item container display={"flex"} justifyContent="flex-end">
            <Grid container item display={"flex"} justifyContent="space-between">
              <Grid item>
                <Button variant="contained">PREVIOUS SECTION</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">NEXT SECTION</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

const SectionPage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <SectionView data={""} />
    </Suspense>
  )
}

SectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default SectionPage
