import * as React from "react";

import { Route, Switch } from "react-router-dom";

import withRoot from "../WithRoot";

// import withStyles, {
//   StyleRulesCallback
// } from "@material-ui/core/styles/withStyles";
// import {
//   // StyleRulesCallback,
//   WithStyles
// } from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

// import MenuIcon from "@material-ui/icons/MenuIcon";

import HtmlElementWatcher from "../components/utils/ScrollTracker";

//  import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import Fade from "@material-ui/core/Fade";

import {
  IPropsMenuListControl,
  MenuListControl
} from "../components/shared/routeData";

import {
  AsyncAboutPage,
  AsyncArticlesPage,
  AsyncContactPage,
  AsyncHomePage,
  AsyncMediaPage,
  AsyncResumePage
} from "./Routes";

import TempPage from "../views/Temp";

import { IconGithub } from "../components/shared/IconGithub";

// const styles: StyleRulesCallback<"root"> = (theme: any) => ({
//   appBar: {
//     boxShadow: "0 0 0 0 rgba(255, 105, 135, .30)",
//     transition: "ease-out",
//     zIndex: theme.zIndex.drawer + 1
//   },
//   appContent: {
//     height: "80vh",
//     margin: "auto",
//     marginTop: 10,
//     width: "94vw",
//     zIndex: theme.zIndex.drawer + 2
//   },
//   drawer: {
//     marginTop: 120
//   },
//   flex: {
//     color: "#26C9FF!important",
//     flex: 1
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 10
//   },
//   root: {
//     flexGrow: 1,
//     padding: 0
//   },
//   toolbar: theme.mixins.toolbar
// });
export interface INavigationProps {
  classes: any;
}
export interface INavigationState {
  bottom?: boolean;
  left: boolean;
  message?: any;
  right?: boolean;
  top?: boolean;
  vPos?: number;
  isShadowVisible?: boolean;
  softMessage: string;
}
export const styles2 = (theme: any) => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: "100%"
  }
});
export const NoMatch = () => (
  <React.Fragment>
    <h4>Error</h4>
    <p>There was an error with the page you were trying to load.</p>
  </React.Fragment>
);

class Navigation extends React.Component<INavigationProps, any> {
  public elementAppContent: any;
  public elementScrollLabel: any;
  public spyGuy: HtmlElementWatcher;

  constructor(props: INavigationProps, state: any) {
    super(props);
    this.toggleDrawer2 = this.toggleDrawer2.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.onElementScroll = this.onElementScroll.bind(this);

    this.state = {
      bottom: false,
      left: false,
      message: "Nothing so far",
      right: false,
      softMessage: "Dont break",
      top: false,
      vPos: 0
    };
  }
  public componentDidMount() {
    this.elementAppContent = document.getElementById("appContentId");
    this.elementAppContent.addEventListener("scroll", this.handleScroll);
  }
  public componentWillUnmount() {
    this.elementAppContent.removeEventListener("scroll", this.handleScroll);
  }
  public onElementScroll() {
    console.log("this element scrolled");
  }
  public handleScroll() {
    if (this.elementAppContent.scrollTop > 100) {
      if (this.elementAppContent) {
        this.setState({ isShadowVisible: true });
      }
    }
    if (this.elementAppContent.scrollTop < 99) {
      this.setState({ isShadowVisible: false });
    }
  }
  public toggleDrawer = (side: any, open: any) => () => {
    this.setState({
      [side]: open
    });
  };
  public toggleDrawer2(side: any, open: any) {
    this.setState({
      [side]: open
    });
  }
  public renderAppBar(props: INavigationProps) {
    const { classes } = props;
    return (
      <React.Fragment>
        <AppBar
          position="fixed"
          className={classes.appBar}
          color="primary"
          id="appBar"
        >
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer("left", true)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              variant="title"
              color="primary"
              className={classes.flex}
            >
              <span style={{ color: "#FFF" }}>m3</span>
            </Typography>
            <span id="scrollCountLabel" />
            &nbsp;
            <IconGithub />
          </Toolbar>
        </AppBar>
        <Fade in={this.state.isShadowVisible}>
          <div className="Navigation-Shadow">&nbsp;</div>
        </Fade>
      </React.Fragment>
    );
  }
  public render() {
    // const { classes } = this.props;
    const pprops: IPropsMenuListControl = {
      classes: styles2,
      onHandleClick: this.toggleDrawer2
    };
    return (
      <React.Fragment>
        <main>
          {this.renderAppBar(this.props)};
          <SwipeableDrawer
            open={this.state.left}
            onOpen={this.toggleDrawer("left", true)}
            onClose={this.toggleDrawer("left", false)}
          >
            <div tabIndex={0} role="button">
              <MenuListControl {...pprops} />
            </div>
          </SwipeableDrawer>
          <section className="app-content" id="appContentId">
            <Switch>
              <Route exact={true} path="/" component={AsyncHomePage} />
              <Route path="/about" component={AsyncAboutPage} />
              <Route path="/articles" component={AsyncArticlesPage} />
              <Route path="/resume" component={AsyncResumePage} />
              <Route path="/contact" component={AsyncContactPage} />
              <Route path="/media" component={AsyncMediaPage} />
              <Route path="/temp" component={TempPage} />
              <Route component={NoMatch} />
            </Switch>
          </section>
        </main>
      </React.Fragment>
    );
  }
}
export default withRoot(Navigation);
// className={classes.root}
