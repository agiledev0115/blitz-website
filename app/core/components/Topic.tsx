import { Box, Chip, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Section, Topic as TopicType } from "@prisma/client"
import React from "react"
import Draggable from "react-beautiful-dnd"
import {
  ArrowDownward,
  ArrowUpward,
  Label,
  Link,
  RemoveRedEye,
  DriveFileRenameOutline,
  Edit,
  FileCopy,
  DriveFileMove,
  Archive,
} from "@mui/icons-material"
import SectionCard from "./SectionCard"

interface Topic {
  data: TopicType & {
    sections?: Section[]
  }
}

const Topic: React.FC<Topic> = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      width={"full"}
      height="fit-content"
      bgcolor={data.status == "DRAFT" ? "rgba(240, 240, 240, 1) " : "rgba(25, 118, 210, 0.12)"}
      sx={{
        "&:hover": { backgroundColor: data.status == "DRAFT" ? "" : "rgba(25, 118, 210, 0.24)" },
      }}
    >
      <Grid padding={3} container display="flex" flexDirection={"column"}>
        <Grid item xs={12} display="flex" justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h6" fontWeight={"600"} color="textPrimary">
            {data?.name}
          </Typography>
          <Grid item>
            {data.status == "DRAFT" ? (
              <Chip
                label={"Draft"}
                size="small"
                sx={{ color: "rgba(0, 0, 0, 0.6)", background: "rgba(0, 0, 0, 0.12)" }}
              />
            ) : (
              <></>
            )}
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
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
                  //navigator.clipboard.writeText(`http://localhost:3000/spaces/${space.id}/topics/$(topic.id)`)
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
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{data.description}</Typography>
        </Grid>
        <Grid paddingTop={1} container item xs={12}>
          {data.tags.map((tag, idx) => {
            return (
              <Chip
                key={"topicTag" + tag + idx}
                label={tag}
                color={"info"}
                sx={{
                  marginRight: "5px",
                  backgroundColor: data.status == "DRAFT" ? "rgba(2, 136, 209, 0.4)" : "info",
                }}
              />
            )
          })}
        </Grid>
        <Grid item xs={12} container padding={0} paddingTop={4}>
          {data?.sections?.map((section) => {
            return <SectionCard section={section} />
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Topic
