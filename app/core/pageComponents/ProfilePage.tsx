import { useRouter } from "blitz"
import { Button, Card, CardContent, Grid, Icon, Typography } from "@mui/material"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  PasswordRepeatElement,
} from "react-hook-form-mui"
import { useForm } from "react-hook-form"

const Profile = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const formContext = useForm<{}>({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      password: "",
      confirmPassword: "",
    },
  })

  return (
    <>
      <Grid container paddingTop={5} height="100%">
        <Grid container xs={2.8} padding={3} direction="column" height="100%">
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
        <Grid container xs={8} direction={"row"} height="100%">
          <Grid container xs={12} direction={"row"} paddingTop={3}>
            <Grid item xs={1.3}>
              <Icon
                sx={{
                  height: "80px",
                  width: "80px",
                }}
              >
                <AccountCircleIcon
                  sx={{
                    height: "80px",
                    width: "80px",
                  }}
                />
              </Icon>
            </Grid>
            <Grid item>
              <Typography variant="h4" fontWeight={"600"}>
                {currentUser?.firstName} {currentUser?.lastName}
              </Typography>

              <Typography paddingTop={2} variant="body1">
                Manage your profile and password
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} direction={"column"} paddingTop={5}>
            <FormContainer
              formContext={formContext}
              onSuccess={(values) => {
                console.log(values)
              }}
            >
              <Grid item xs={12}>
                <Typography fontWeight="700" color="#6E7A89">
                  First Name
                </Typography>
                <TextFieldElement
                  name="firstName"
                  style={{
                    paddingTop: "1%",
                  }}
                  size="small"
                  fullWidth
                ></TextFieldElement>
              </Grid>
              <Grid item xs={12} paddingTop={5}>
                <Typography fontWeight="700" color="#6E7A89">
                  Last Name
                </Typography>
                <TextFieldElement
                  name="lastName"
                  style={{
                    paddingTop: "1%",
                  }}
                  size="small"
                  fullWidth
                ></TextFieldElement>
              </Grid>
              <Grid item xs={12} paddingTop={5}>
                <Typography fontWeight="700" color="#6E7A89">
                  Email
                </Typography>
                <TextFieldElement
                  name="email"
                  style={{
                    paddingTop: "1%",
                  }}
                  size="small"
                  fullWidth
                ></TextFieldElement>
              </Grid>
              <Grid item xs={12} paddingTop={5}>
                <Typography fontWeight="700" color="#6E7A89">
                  Locale
                </Typography>
                <TextFieldElement
                  name="locale"
                  style={{
                    paddingTop: "1%",
                  }}
                  size="small"
                  fullWidth
                ></TextFieldElement>
              </Grid>
              <Grid item xs={12} paddingTop={5}>
                <Typography fontWeight="700" color="#6E7A89">
                  Password
                </Typography>
                <PasswordElement
                  name="password"
                  style={{
                    paddingTop: "1%",
                  }}
                  size="small"
                  fullWidth
                ></PasswordElement>
              </Grid>
              <Grid item xs={12} paddingTop={5}>
                <Typography fontWeight="700" color="#6E7A89">
                  Confirm Password
                </Typography>
                <PasswordRepeatElement
                  name="confirmPassword"
                  passwordFieldName="password"
                  style={{
                    paddingTop: "1%",
                  }}
                  size="small"
                  fullWidth
                ></PasswordRepeatElement>
              </Grid>
              <Grid item xs={3} paddingTop={5} paddingBottom={5}>
                <Button variant="contained" color="primary" size="medium" type="submit">
                  SAVE
                </Button>
              </Grid>
            </FormContainer>
          </Grid>
        </Grid>
      </Grid>
      {/* <Space
        name="Test"
        description="Test description"
        status="DRAFT"
        tags={["Test1", "Test2"]}
        documents={[
          {
            id: 1,
            title: "Test1",
            status: "DRAFT",
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: ["Test1", "Test2"],
            spaceId: 1,
          },
        ]}
      /> */}
      {/* <Document
        name="Test Document"
        description="Test description lorem ipsum siks ok salo asfkasf"
        status="LIVE"
        tags={["Tag1", "Tag2"]}
      /> */}
    </>
  )
}

export default Profile
