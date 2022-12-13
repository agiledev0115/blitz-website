import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { FieldController } from "app/core/components/FieldController"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

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
            <Typography variant="h4">Logo Here</Typography>
          </Grid>

          <Grid item padding={1}>
            <Link href="/api/auth/google">
              <a>Log In With Google</a>
            </Link>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Form
              schema={Login}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                console.log(values)
                try {
                  const user = await loginMutation(values)
                  props.onSuccess?.(user)
                } catch (error: any) {
                  if (error instanceof AuthenticationError) {
                    return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                  } else {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " +
                        error.toString(),
                    }
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
                  <FieldController name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <FieldController name="password" label="Password" />
                </Grid>
                <Grid item display="flex" justifyContent="center">
                  <Button variant="contained" type="submit">
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Link href={Routes.ForgotPasswordPage()}>
                    <a>Forgot your password?</a>
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Grid>

          <Grid item padding={1}>
            Or <Link href={Routes.SignupPage()}>Sign Up</Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default LoginForm
