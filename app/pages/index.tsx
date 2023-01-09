import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { Box } from "@mui/system"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          First Name: <code>{currentUser.firstName}</code>
          <br />
          Last Name: <code>{currentUser.lastName}</code>
          <br />
          User role: <code>{currentUser.role}</code>
          <br />
          User workspace: <code>{currentUser.BelongedCompany[0]?.name}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <h2>Library</h2>
        <Paper style={{ padding: "1rem 2rem" }}>
          <TextField
            label={<SearchIcon />}
            placeholder=""
            variant="standard"
            fullWidth
            margin="normal"
            size="medium"
          />

          <div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Type"
                variant="standard"
              >
                <MenuItem value={10}>Type 1</MenuItem>
                <MenuItem value={21}>Type 2</MenuItem>
                <MenuItem value={22}>Type 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Tags</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Type"
                variant="standard"
              >
                <MenuItem value={10}>Type 1</MenuItem>
                <MenuItem value={21}>Type 2</MenuItem>
                <MenuItem value={22}>Type 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">People</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Type"
                variant="standard"
              >
                <MenuItem value={10}>Type 1</MenuItem>
                <MenuItem value={21}>Type 2</MenuItem>
                <MenuItem value={22}>Type 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Last Modified</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Type"
                variant="standard"
              >
                <MenuItem value={10}>Type 1</MenuItem>
                <MenuItem value={21}>Type 2</MenuItem>
                <MenuItem value={22}>Type 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Type"
                variant="standard"
              >
                <MenuItem value={10}>Type 1</MenuItem>
                <MenuItem value={21}>Type 2</MenuItem>
                <MenuItem value={22}>Type 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Type"
                variant="standard"
              >
                <MenuItem value={10}>Type 1</MenuItem>
                <MenuItem value={21}>Type 2</MenuItem>
                <MenuItem value={22}>Type 3</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense> */}
        </Paper>
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        .container {
          width: 100%;
          // min-height: 100vh;
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          // align-items: center;
        }

        main {
          padding: 3.5rem 3.5rem;
          width: 100%;
          // flex: 1;
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          // align-items: center;
        }

        main p {
          font-size: 1.2rem;
        }

        p {
          text-align: center;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #45009d;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          color: #f4f4f4;
          text-decoration: none;
        }

        .logo {
          margin-bottom: 2rem;
        }

        .logo img {
          width: 300px;
        }

        .buttons {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0.5rem;
        }
        .button {
          font-size: 1rem;
          background-color: #6700eb;
          padding: 1rem 2rem;
          color: #f4f4f4;
          text-align: center;
        }

        .button.small {
          padding: 0.5rem 1rem;
        }

        .button:hover {
          background-color: #45009d;
        }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        .button-outline:hover {
          border-color: #45009d;
          color: #45009d;
        }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }
        code {
          font-size: 0.9rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
