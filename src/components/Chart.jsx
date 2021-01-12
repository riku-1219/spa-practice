import React from "react";
import { Line } from "react-chartjs-2";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      population: [],
      chartData: {
        labels: [
          1960,
          1965,
          1970,
          1975,
          1980,
          1985,
          1990,
          1995,
          2000,
          2005,
          2010,
          2015,
          2020,
          2025,
          2030,
          2035,
          2040,
          2045,
        ],
        datasets: [
          {
            data: [
              1239655,
              1239655,
              1239655,
              1239655,
              12817,
              12707,
              12571,
              12602,
              12602,
              11518,
              10888,
              10133,
              9275,
              8431,
              7610,
              6816,
              6048,
              5324,
            ],
          },
        ],
      },
    };
  }

  getData = () => {
    const chartData = this.state.chartData;
    this.state.population.map((obj) => {
      const data = [];
      data.push(obj.value);
    });
    const dataObj = {};
  }; // この部分で手が止まってしまいました。

  fetchPopulation = (prefCode) => {
    fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
        headers: {
          "X-API-KEY": "txoJHsTPn2FZJH94ezJGJ9OxKejn76ecrgOrwDlb",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (data) => {
          const population = this.state.population;
          population.push([data.result.data[0].data]);
          this.setState({
            isLoaded: true,
            population: population,
          });
          console.log(this.state.population);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.checkedCodes !== this.props.checkedCodes) {
      this.setState({
        population: [],
      });
      this.props.checkedCodes.forEach((prefCode) => {
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
      return <Line data={this.state.chartData} />;
    }
  }
}
