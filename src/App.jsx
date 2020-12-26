import React from "react";
import { CheckBoxes } from "./components/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      prefs: [],
      checkedCodes: new Set([]),
    };

    this.changeIsChecked = this.changeIsChecked.bind(this);
  }

  changeIsChecked = (prefCode) => {
    const checkedCodes = new Set(this.state.checkedCodes);
    if (checkedCodes.has(prefCode)) {
      checkedCodes.delete(prefCode);
    } else {
      checkedCodes.add(prefCode);
      console.log(this.state.checkedCodes);
    }
    this.setState({ checkedCodes: checkedCodes });
    console.log(
      this.state.prefs
      .filter((pref) => checkedCodes.has(pref.prefCode))
      .map((pref) => pref.prefCode)
      );
      console.log(checkedCodes);
  };

  componentDidMount() {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: {
        "X-API-KEY": "txoJHsTPn2FZJH94ezJGJ9OxKejn76ecrgOrwDlb",
      },
    })
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            prefs: data.result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <CheckBoxes
          prefs={this.state.prefs}
          checkedCodes={this.state.checkedCodes}
          changeIsChecked={this.changeIsChecked}
        />
      );
    }
  }
}
