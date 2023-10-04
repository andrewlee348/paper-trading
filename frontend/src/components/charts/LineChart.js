import React, { useRef, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      graphData: this.props.chartData,
      chartData: [this.props.chartData[0]],
      chartOptions: this.props.chartOptions,
    });
    console.log("linechart data: ", this.props.chartData);
  }

  updateData(index) {
    this.chartRef.current.chart.updateSeries([this.state.graphData[index]]);
    // this.chartRef.current.chart.toggleSeries(newData);
  }

  componentDidUpdate() {
    // this.chartRef.current.chart.updateSeries({
    //   series: [
    //     [10, 20],
    //     [30, 50],
    //   ],
    // });
  }

  changeDateFormat(dateFormat) {
    this.chartRef.current.chart.updateOptions({
      xaxis: {
        labels: {
          formatter: function (val) {
            const date = new Date(val);
            const minute = date.getMinutes();
            const hour = date.getHours();
            const day = date.getDate();
            const month = date.toLocaleString("en-us", { month: "short" });
            const year = date.getFullYear();

            // console.log("Data:" + dateFormat);

            if (dateFormat === "day") {
              return `${day} ${month} ${year} ${hour}:${minute}`;
            } else {
              return `${day} ${month} ${year} ${hour}`;
            }
          },
        },
      },
    });
  }

  updateDates(timeline) {
    this.setState({
      selection: timeline,
    });
    switch (timeline) {
      case "ytd":
        console.log("mr", this.chartRef.current.chart);
        // this.chartRef.current.chart.exec(
        //   'area-datetime',
        //   'zoomX',
        //   new Date('01 Jan 2013').getTime(),
        //   new Date('27 Feb 2013').getTime()
        // )
        this.chartRef.current.chart.zoomX(
          new Date("27 Sept 2023").getTime(),
          new Date("02 Oct 2023").getTime()
        );
        break;
      default:
    }
  }

  render() {
    return (
      <>
        <button
          id="ytd"
          onClick={() => {
            // this.changeDateFormat("day");
            this.updateData(4);
          }}
          className={this.state.selection === "ytd" ? "active" : ""}
        >
          YTD
        </button>
        <ReactApexChart
          options={this.state.chartOptions}
          // series={this.state.chartData}
          series={this.state.chartData}
          type="area"
          width="100%"
          height="100%"
          ref={this.chartRef}
        />
      </>
    );
  }
}

export default LineChart;
