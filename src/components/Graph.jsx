import React from "react";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      population: [],
    }
  }

  fetchPopulation = (prefCode) => {
    fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`, {
        headers: {
          "X-API-KEY": "txoJHsTPn2FZJH94ezJGJ9OxKejn76ecrgOrwDlb",
        },
      })
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            population: data.result.data[0],
          });
          // デバッグのため後で削除
          console.log(this.state.population);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checkedCodes !== this.props.checkedCodes) {
      console.log(this.props.checkedCodes);
      this.props.checkedCodes.forEach(prefCode => {
        this.fetchPopulation(prefCode);
      });
    }
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <h1>通信できました！！</h1>
      );
    }
  }
}