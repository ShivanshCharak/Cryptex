// components/MiniD3Chart.js
'use client';

import React, { useEffect, useRef,useState } from 'react';
import * as d3 from 'd3';

const MiniD3Chart = ({ data, color = '#4caf50', width, height = 20 }) => {
  const chartRef = useRef(null);
  console.log("MiniD3Chart",width)

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Set up SVG
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', 'transparent');

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yExtent = d3.extent(data, d => d.value);
    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX); // smooth line

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [data, color, width, height]);

  return <div ref={chartRef} />;
};

export const DynamicMiniChart = ({width}) => {
  const [data, setData] = useState(generateData());
  function generateData() {
    const today = new Date();
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        width:width,
        time: date.toISOString().split('T')[0],
        value: Math.random() * 100,
      });
    }


    return data;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return <MiniD3Chart data={data} width={width} color="#00ff91" />;
};
