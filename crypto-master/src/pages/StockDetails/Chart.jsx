import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import fetchData, { dataType } from "../Home/fetchMarketData";
import { convertToUnixTimestamp } from "./ConvertToChartData";

const Chart = () => {
  const [stockData, setStockData] = useState(null);
  

  useEffect(() => {
    const fetchStockData = async () => {
      const data = await fetchData();
      console.log("stock data ", data[dataType]);
      const chartData=convertToUnixTimestamp(data[dataType])
      console.log("chartData ",chartData)
      setStockData(data);
    };
    fetchStockData();
  }, []);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  // Extracting dates and closing prices from the data
  const dates = Object.keys(stockData[dataType]);
  const closePrices = dates.map((date) =>
    parseFloat(stockData[dataType][date]["4. close"])
  );

  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      categories: dates,
      title: {
        // text: 'Date',
      },
      pan: {
        enabled: true,
      },
    },
    yaxis: {
      title: {
        // text: 'Closing Price (USD)',
      },
    },
    title: {
      text: "IBM Stock Weekly Closing Prices",
      align: "center",
    },
    colors: ["#fff"], // Line color
    markers: {
      colors: ["#fff"], // Dot color
      strokeColors: "#fff", // Dot border color
      strokeWidth: 2, // Dot border width
    },
    tooltip: {
      theme: "dark", // Tooltip theme (light/dark)
    },
    toolbar: {
      show: true, // Hide the toolbar
    },
    grid: {
      borderColor: "#cccccc", // Color of the grid lines
      strokeDashArray: 4, // Width of the grid lines
      show: true,
    },
    series: [{
        name: 'Series 1', // Series name
        data: closePrices, // Your series data
        fill: {
            type: 'solid', // Type of fill (solid, gradient, pattern, image, etc.)
            color: '#3367d6', // Background color
            opacity: 0.5 // Opacity of the fill
        }
    }]
  };
  //   colors: ['#008FFB']

  // ApexCharts series data
  const series = [
    {
      name: "Close Prices",
      data: closePrices,
    },
  ];

  return (
    <div className="stock-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={640}
      />
    </div>
  );
};

export default Chart;
