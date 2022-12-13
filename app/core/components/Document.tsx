import { Card, CardContent, Typography, Chip, Box, Stack } from "@mui/material"
import { Space } from "@prisma/client"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"

interface DocumentProps {
  name: string
  description: string
  status: string
  tags: string[]
}

export const Document: React.FunctionComponent<DocumentProps> = ({
  name,
  description,
  status,
  tags,
}) => {
  return (
    <Card
      elevation={2}
      sx={{
        backgroundColor: "#F6F4EE",
        borderRadius: "16px",
        margin: "16px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography fontWeight={"700"} variant={"h5"} color="#404B5A">
            {name}
          </Typography>
          <Typography color="#434343" paddingTop={2}>
            {description}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <Chip
              label={status}
              color={status !== "DRAFT" ? "success" : "info"}
              sx={{
                marginRight: "2%",
              }}
            />
            <Stack direction={"row"}>
              {tags.map((tag) => (
                <Stack key={tag} direction={"row"} paddingRight={"15%"}>
                  <LocalOfferIcon />
                  <Typography color="#6E7A89" fontWeight={"700"}>
                    {tag}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  )
}
