import React from "react"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { mapIcon } from "@components/icons"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { useTranslation } from "react-i18next"
import ShareButton from "@/components/organisms/ShareButton"
import styled from "styled-components"
import Link from "@material-ui/core/Link"
import { UnstyledLink } from "@components/atoms/UnstyledLink"
import { getLocalizedPath } from "@/utils/i18n"
import LanguageSwitcher from "@/components/organisms/LanguageSwitcher"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appTitleLink: {
    color: "inherit",
    textDecoration: "inherit",
    "&:hover": {
      textDecoration: "none",
    },
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const AppTitle = styled(Typography)`
  && {
    flex-grow: 1;
    text-align: center;
  }
`

function ResponsiveDrawer(props) {
  const { container, pages, children, className } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { t, i18n } = useTranslation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = pages => {
    return (
      <div>
        <div className={classes.toolbar} />
        <UnstyledLink to={getLocalizedPath(i18n, "/")}>
          <ListItem>
            <ListItemIcon>{mapIcon("home")}</ListItemIcon>
            <ListItemText primary={t("text.homepage")} />
          </ListItem>
        </UnstyledLink>
        <Divider />
        <List>
          {pages.map((page, index) => (
            <UnstyledLink
              to={getLocalizedPath(i18n, page.to)}
              key={index}
              activeClassName={"active"}
            >
              <ListItem>
                <ListItemIcon>{mapIcon(page.icon)}</ListItemIcon>
                <ListItemText primary={t(page.title)} />
              </ListItem>
            </UnstyledLink>
          ))}
        </List>
        <Divider />
        <ListItem>
          <ListItemIcon>{mapIcon("translate")}</ListItemIcon>
          <LanguageSwitcher />
        </ListItem>
        <Divider />
        {/* Only show the forms in chinese as we do not have english form.. */}
        {i18n.language === "zh" && (
          <Link target="_blank" href="https://forms.gle/gK477bmq8cG57ELv8">
            <ListItem>
              <ListItemIcon>{mapIcon("edit")}</ListItemIcon>
              <ListItemText primary={t("dodgy_shops.report_incident")} />
            </ListItem>
          </Link>
        )}

        {i18n.language === "zh" && (
          <Link target="_blank" href="https://forms.gle/1M96G6xHH2tku4mJ8">
            <ListItem>
              <ListItemIcon>{mapIcon("contact_support")}</ListItemIcon>
              <ListItemText primary={t("text.help_us")} />
            </ListItem>
          </Link>
        )}
      </div>
    )
  }

  const drawerFooter = () => (
    <div>
      <Link
        target="_blank"
        href={`https://www.collaction.hk/s/g0vhk/fund?lang=${i18n.language}`}
      >
        <ListItem>
          <ListItemIcon>{mapIcon("thumb_up")}</ListItemIcon>
          <ListItemText primary={t("text.support_us")} />
        </ListItem>
      </Link>
    </div>
  )

  return (
    <div className={`${classes.root} ${className}`}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.appToolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            {mapIcon("menu")}
          </IconButton>
          <AppTitle variant="h1" noWrap>
            <Link className={classes.appTitleLink} href="/">
              {t("site.title")}
            </Link>
          </AppTitle>
          <ShareButton />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onOpen={() => {}}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer(pages)}
            {drawerFooter()}
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <SwipeableDrawer
            onOpen={() => {}}
            onClose={() => {}}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer(pages)}
            {drawerFooter()}
          </SwipeableDrawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default ResponsiveDrawer
