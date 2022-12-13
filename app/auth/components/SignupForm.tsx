import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Button, Grid, Paper, Typography } from "@mui/material"
import { FieldController } from "app/core/components/FieldController"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      bgcolor="#FAF7FD"
    >
      <Paper style={{ height: "50%", width: "50%" }}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item padding={1}>
            <Typography variant="h4">Sign Up</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Form
              schema={Signup}
              initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
              onSubmit={async (values) => {
                console.log(values)
                try {
                  await signupMutation(values)
                  props.onSuccess?.()
                } catch (error: any) {
                  if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                    // This error comes from Prisma
                    return { email: "This email is already being used" }
                  } else {
                    return { [FORM_ERROR]: error.toString() }
                  }
                }
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12}>
                  <FieldController name="firstName" label="First Name" />
                </Grid>
                <Grid item xs={12}>
                  <FieldController name="lastName" label="Last Name" />
                </Grid>
                <Grid item xs={12}>
                  <FieldController name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <FieldController name="password" label="Password" />
                </Grid>
                <Grid item xs={12}>
                  <FieldController name="companyName" label="Company Name" />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button variant="contained" type="submit">
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default SignupForm
