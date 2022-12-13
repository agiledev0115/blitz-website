import React, { ReactNode } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { ArrowDropDown } from "@mui/icons-material"
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material"

import { Dayjs } from "dayjs"
import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

interface Filter {
  mainLabel: string
  menuItems: menuItem[]
  variant: "default" | "sortBy"
}

interface menuItem {
  label: string
  icon?: React.ReactNode
  filterType?: "asc" | "desc"
}

const Filter: React.FC<Filter> = ({ mainLabel, menuItems, variant }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [sortButton, setSortButton] = React.useState<null | HTMLElement>(null)
  const [placeholder, setPlaceholder] = React.useState<string | undefined>("Last Modified") // Change
  const [iconString, setIconString] = React.useState<string>("desc")
  const open = Boolean(anchorEl)
  const openSort = Boolean(sortButton)

  const [value, setValue] = React.useState<Dayjs | null>(null)

  const handlePlaceHolder = (event: EventTarget) => {
    let temp = menuItems.find((menuItem) => {
      if (menuItem.label == (event as HTMLInputElement).textContent) return menuItem // Always first
      return null
    })

    setPlaceholder(temp?.label)
  }

  const handleSortByClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortButton(event.currentTarget)
  }
  const handleSortByClose = () => {
    setSortButton(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return variant == "default" ? (
    <>
      <Button
        style={{
          fontSize: "12px",
          color: "rgba(0, 0, 0, 0.6)",
        }}
        endIcon={<ArrowDropDown />}
        onClick={handleClick}
      >
        {mainLabel}
      </Button>
      <Menu
        id="filter-type-menu"
        aria-labelledby="filter-type-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {menuItems.map((item, idx) => (
          <MenuItem
            key={"filter_item " + idx}
            onClick={() => {
              if (mainLabel !== "Last Modified") {
                handleClose()
              }
            }}
          >
            {mainLabel == "Last Modified" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Label"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            ) : item.icon ? (
              <>
                <ListItemIcon sx={{ paddingRight: "16px" }}>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </>
            ) : (
              <ListItemText>{item.label}</ListItemText>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : (
    <>
      {" "}
      <Button
        style={{
          fontSize: "12px",
          color: "rgba(0, 0, 0, 0.6)",
        }}
        endIcon={<ArrowDropDown />}
        onClick={handleSortByClick}
        sx={{ textTransform: "none" }}
      >
        <Typography fontSize={12} fontWeight={"bold"} sx={{ paddingRight: 1 }}>
          {"Sort by"}
        </Typography>
        <Typography fontSize={12} sx={{ textTransform: "uppercase" }}>
          {placeholder}
        </Typography>
        {/* <ListItemIcon sx={{ minWidth: "20px" }}>
          {iconString == "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </ListItemIcon> */}
      </Button>
      <Menu
        id="filter-type-menu"
        aria-labelledby="filter-type-button"
        anchorEl={sortButton}
        open={openSort}
        onClose={handleSortByClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuItems.map((item, idx) => (
          <MenuItem
            key={"sort_item " + idx}
            className={item.filterType}
            onClick={(e) => {
              handlePlaceHolder(e.target)
              //handleSortByClose()
            }}
          >
            <ListItemText>{item.label}</ListItemText>
            {item.icon ? (
              <ListItemIcon sx={{ paddingRight: "16px" }}>{item.icon}</ListItemIcon>
            ) : (
              <ListItemIcon sx={{ paddingRight: "16px" }}>
                {item.filterType == "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Filter
