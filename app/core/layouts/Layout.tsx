import Grid from "@mui/material/Grid"
import { Head, BlitzLayout } from "blitz"
import { Suspense } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import NavBar from "./NavBar"
import SideBar from "./SideBar"

/*
const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "copycat"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <NavBar /> }
      <Grid container>
        <Grid item className="sideBar">
          <Suspense>
            <SideBar />
          </Suspense>
        </Grid>
        <Grid item flexGrow={1} marginTop={"64px"} className="page">
          {children}
        </Grid>
      </Grid>
    </>
  )
}
*/

const Layout = ({ children }) => {
  return (
    <Suspense>
      <SideBar>{children}</SideBar>
    </Suspense>
  )
}

export default Layout
