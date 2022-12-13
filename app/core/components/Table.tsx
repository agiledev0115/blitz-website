import React from "react"
import { makeStyles } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import IconButton from "@mui/material/IconButton"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Company, Section, Space } from "@prisma/client"
import Topic from "./Topic"
import { Chip } from "@mui/material"
import { Folder, MoreVert } from "@mui/icons-material"

interface TableProps {
  data: any
}

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  )
}

const CustomTable: React.FC<TableProps> = ({ data }) => {
  return (
    <Table
      sx={{
        backgroundColor: "#FAFAFA",
        boxShadow: 0,
        border: 0,
      }}
      aria-label="Custom table"
    >
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          <TableCell></TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Tags</TableCell>
          <TableCell>Archived On</TableCell>
          <TableCell>Contains</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => {
          if (row.topics.length !== 0 || row.sections.length !== 0) {
            return (
              <ExpandableTableRow
                key={row}
                expandComponent={(() => {
                  if (row.topics) {
                    return row.topics.map((topic, topicIdx) => {
                      return (
                        <ExpandableTableRow
                          key={topic.name + topicIdx}
                          expandComponent={(() => {
                            return topic.sections.map((section, sectionIdx) => {
                              return (
                                <TableCell key={section.title + sectionIdx}>
                                  {section.title}
                                </TableCell>
                              )
                            })
                          })()}
                        >
                          {row.name}
                        </ExpandableTableRow>
                      )
                    })
                  }
                  return (
                    <ExpandableTableRow
                      expandComponent={(() => {
                        return row.sections.map((section, sectionIdx) => {
                          return (
                            <TableCell key={section.title + sectionIdx}>{section.title}</TableCell>
                          )
                        })
                      })()}
                    >
                      {row.name}
                    </ExpandableTableRow>
                  )
                })()}
              >
                <TableCell>
                  <Folder />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.tags.map((tag, idx) => {
                    return (
                      <Chip
                        key={tag + idx}
                        label={tag}
                        color={"info"}
                        sx={{
                          marginRight: "5px",
                        }}
                      />
                    )
                  })}
                </TableCell>
                <TableCell>{row.updatedAt.toString()}</TableCell>
                <TableCell>{row.contains}</TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </ExpandableTableRow>
            )
          } else {
            return (
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  {row.tags.map((tag, idx) => {
                    return (
                      <Chip
                        key={tag + idx}
                        label={tag}
                        color={"info"}
                        sx={{
                          marginRight: "5px",
                        }}
                      />
                    )
                  })}
                </TableCell>
                <TableCell>{row.updatedAt.toString()}</TableCell>
                <TableCell>{row.contains}</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            )
          }
        })}
      </TableBody>
    </Table>
  )
}

export default CustomTable
