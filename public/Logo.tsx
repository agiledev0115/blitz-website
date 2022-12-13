import { Icon, SvgIcon } from "@mui/material"
import { makeStyles } from "@mui/styles"

export const LogoIcon = (props) => {
  const useStyles = makeStyles({
    imageIcon: {
      height: "100%",
    },
    iconRoot: {
      textAlign: "center",
    },
  }) as any

  const classes = useStyles()

  return (
    <Icon classes={{ root: classes.iconRoot }}>
      <img className={classes.imageIcon} src="/DarwinStrategyLogo.svg" />
    </Icon>
  )
}
