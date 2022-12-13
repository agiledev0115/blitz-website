import React from "react"
import { Section as SectionType } from "@prisma/client"
import {
  ArrowUpward,
  ArrowDownward,
  Archive,
  DriveFileMove,
  DriveFileRenameOutline,
  Edit,
  FileCopy,
  Label,
  RemoveRedEye,
  Link,
} from "@mui/icons-material"
import { Grid, Box, Typography, Chip, IconButton, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { loremIpsum } from "react-lorem-ipsum"

interface SectionCard {
  section: SectionType
}

const SectionCard: React.FC<SectionCard> = ({ section }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Grid
        key={"section_card" + section.id}
        xs={12}
        borderRadius={"6px"}
        bgcolor="white"
        marginTop={2}
        container
      >
        <Grid
          container
          item
          xs={12}
          display="flex"
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          margin={1}
        >
          <Box
            display="flex"
            flexDirection="row"
            padding={1}
            alignContent="center"
            sx={{ opacity: section.status == "DRAFT" ? "50%" : "100%" }}
          >
            <Typography paddingRight={3} fontWeight={"500"} variant="body1" color="textPrimary">
              {section.id}
            </Typography>
            <Typography fontWeight={"500"} variant="body1" color="textPrimary">
              {section.title}
            </Typography>
          </Box>
          <Box>
            {section.status == "DRAFT" ? (
              <Chip
                label={"Draft"}
                size="small"
                sx={{ color: "rgba(0, 0, 0, 0.6)", background: "rgba(0, 0, 0, 0.12)" }}
              />
            ) : (
              <></>
            )}
            <IconButton>
              <ArrowUpward fontSize="small" />
            </IconButton>
            <IconButton>
              <ArrowDownward fontSize="small" />
            </IconButton>
            <IconButton onClick={handleClick}>
              <MoreVertIcon fontSize="small" />
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
          </Box>
        </Grid>
        <Grid padding={1} item>
          {loremIpsum({ random: true }).map((text) => (
            <Typography
              className="text"
              key={text}
              sx={{ opacity: section.status == "DRAFT" ? "50%" : "100%" }}
            >
              {text}
            </Typography>
          ))}
        </Grid>
        <Grid item padding={1}>
          {section.tags.map((tag, idx) => {
            return (
              <Chip
                key={"sectionTag" + tag + idx}
                label={tag}
                color="info"
                sx={{
                  marginRight: "5px",
                  backgroundColor: section.status == "DRAFT" ? "rgba(2, 136, 209, 0.4)" : "info",
                }}
              />
            )
          })}
        </Grid>
      </Grid>
    </>
  )
}

export default SectionCard
