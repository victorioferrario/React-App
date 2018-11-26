import * as React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./containers/Navigation";
// withStyles,
import {
  // StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";

import withRoot from "./WithRoot";

// const styles: StyleRulesCallback<"root"> = (theme: any) => ({
//   root: {
//     paddingTop: theme.spacing.unit * 20,
//     textAlign: "center"
//   }
// });

export interface IAppState {
  name: any;
  child: any;
  onSubmit: any;
  parent: any;
  open: boolean;
}
class App extends React.Component<WithStyles<"root">, IAppState> {
  constructor(props: any, state: IAppState) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  public handleClose() {
    this.setState({
      open: false
    });
  }
  public handleClick() {
    this.setState({
      open: true
    });
  }
  public componentWillMount() {
    return false;
  }
  public toggleDrawer = (side: any, open: any) => () => {
    this.setState({});
  };
  public render() {
    return (
      <React.Fragment>
        <Router>
          <Navigation />
        </Router>
      </React.Fragment>
    );
  }
}
export default withRoot(App);

// export default withRoot(withStyles(styles)<{}>(App));
