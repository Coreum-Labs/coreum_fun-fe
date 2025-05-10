"use client";

import React, { useEffect, useRef } from "react";
import { createChart, ColorType, AreaSeries } from "lightweight-charts";

const Chart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#312e81" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "rgba(70, 70, 150, 0.2)" },
        horzLines: { color: "rgba(70, 70, 150, 0.2)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.3)",
        visible: true,
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.3)",
        timeVisible: false,
      },
    });

    // Create the area series using the proper constructor approach
    const areaSeries = chart.addSeries(AreaSeries);

    // Set series options
    areaSeries.applyOptions({
      lineColor: "#35F0D0",
      topColor: "rgba(53, 240, 208, 0.6)",
      bottomColor: "rgba(53, 240, 208, 0.1)",
      lineWidth: 2,
      priceLineVisible: false,
    });

    // Sample data for the chart
    const data = [
      { time: "2023-01-01", value: 20 },
      { time: "2023-01-02", value: 25 },
      { time: "2023-01-03", value: 23 },
      { time: "2023-01-04", value: 30 },
      { time: "2023-01-05", value: 25 },
      { time: "2023-01-06", value: 32 },
      { time: "2023-01-07", value: 35 },
      { time: "2023-01-08", value: 33 },
      { time: "2023-01-09", value: 37 },
      { time: "2023-01-10", value: 32 },
      { time: "2023-01-11", value: 38 },
      { time: "2023-01-12", value: 43 },
      { time: "2023-01-13", value: 36 },
      { time: "2023-01-14", value: 25 },
      { time: "2023-01-15", value: 30 },
      { time: "2023-01-16", value: 37 },
      { time: "2023-01-17", value: 40 },
      { time: "2023-01-18", value: 50 },
      { time: "2023-01-19", value: 47 },
      { time: "2023-01-20", value: 55 },
      { time: "2023-01-21", value: 60 },
      { time: "2023-01-22", value: 62 },
      { time: "2023-01-23", value: 58 },
      { time: "2023-01-24", value: 55 },
      { time: "2023-01-25", value: 52 },
      { time: "2023-01-26", value: 57 },
      { time: "2023-01-27", value: 62 },
      { time: "2023-01-28", value: 55 },
      { time: "2023-01-29", value: 23.16 },
    ];

    areaSeries.setData(data);

    // Add custom price markers
    areaSeries.createPriceLine({
      price: 23.16,
      color: "#ef4444",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "23.16",
    });

    areaSeries.createPriceLine({
      price: 76.84,
      color: "#4ade80",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "76.84",
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-indigo-900/50 rounded-lg h-full w-full">
      <div
        ref={chartContainerRef}
        className="h-full w-full bg-indigo-900/30 rounded"
      />
    </div>
  );
};

export default Chart;
