import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import { fetchMarketChart } from "@/Redux/Coin/Action";

const timeSeries = [
  { label: "1D", value: 1 },
  { label: "1M", value: 30 },
  { label: "1Y", value: 365 },
];

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { marketChart } = useSelector((state) => state.coin);
  const [activeType, setActiveType] = useState(timeSeries[0]);

  useEffect(() => {
    if (coinId) {
      dispatch(
        fetchMarketChart({
          coinId,
          days: activeType.value,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [coinId, activeType.value, dispatch]);

  const handleRetry = () => {
    if (coinId) {
      dispatch(
        fetchMarketChart({
          coinId,
          days: activeType.value,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  };

  if (marketChart.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
      </div>
    );
  }

  if (marketChart.error) {
    return (
      <div className="text-center text-red-500 mt-4 space-y-2">
        <p>Error loading chart data: {marketChart.error}</p>
        <button
          onClick={handleRetry}
          className="px-5 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const series = [
    {
      name: "Price",
      data: (marketChart.data?.prices || []).map(([timestamp, price]) => ({
        x: timestamp,
        y: parseFloat(price.toFixed(8)),
      })),
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 400,
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 300 },
      },
    },
    stroke: {
      curve: "smooth",
      colors: ["#1D4ED8"], // Professional deep blue
      width: 2,
    },
    fill: {
      type: "solid",
      opacity: 0.1,
      colors: ["#1D4ED8"],
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#6B7280", fontSize: "12px" } },
    },
    yaxis: {
      labels: { style: { colors: "#6B7280", fontSize: "12px" } },
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: true },
    grid: { borderColor: "#E5E7EB" },
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md">
      <div className="flex justify-center space-x-3 mb-4">
        {timeSeries.map((item) => (
          <button
            key={item.label}
            className={`px-4 py-1.5 text-xs font-medium rounded border transition ${
              activeType.label === item.label
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setActiveType(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ReactApexChart options={options} series={series} type="area" height={400} />
    </div>
  );
};

export default StockChart;
