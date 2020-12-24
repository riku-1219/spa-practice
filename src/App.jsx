import React from "react";
import { CheckBoxes } from "./components/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      prefs: []
    };
  }

  componentDidMount() {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: {
        "X-API-KEY": "txoJHsTPn2FZJH94ezJGJ9OxKejn76ecrgOrwDlb",
      },
    })
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            prefs: data.result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <CheckBoxes prefs={this.state.prefs} />
      );
    }
  }
}

