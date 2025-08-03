// import { DynamicMiniChart } from "../utils/MiniChart"
// import { useEffect } from "react";
// // import {createGauge} from '../utils/D3Chart'
// import ReactSpeedometer from 'react-d3-speedometer'

// export default function MarketAltCard() {
//     useEffect(() => {
//       createGauge({
//         containerId: "gaugeContainer",
//         value: 70,
//         min: 0,
//         max: 100,
//         width: 300,
//         height: 150,
//       });
//     }, []);
//     return (<>
//         <div className="grid w-[500px]  grid-cols-2 mt-3 ml-3 ">
//             <div className="flex flex-col">
//                 <div className="w-[224px] p-4 bg-[#222531] h-[150px] rounded-lg">
//                     <h1>Market Cap</h1>
//                     <div className="flex flex-col h-[60px] justify-around">
//                         <span>$3.25T</span>
//                         <span className="text-red-600  text-sm">1.39%</span>
//                         <div className="p-4">
//                         <DynamicMiniChart width={160}/>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-[224px] p-4 bg-[#222531] h-[150px] mt-5 rounded-lg ">
//                     <h1>CMC100</h1>
//                     <div className="flex flex-col h-[60px] justify-around">
//                         <span>$200.1</span>
//                         <span className="text-red-800 font-semibold text-sm">1.58%</span>
//                         <div className="p-4">
//                             <DynamicMiniChart width={160}/>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>)
// }

// import * as d3 from "d3";

// export function createGauge({
//   containerId,
//   value = 50,
//   min = 0,
//   max = 100,
//   width = 300,
//   height = 200,
// }) {
//   // Remove any previous svg
//   d3.select(`#${containerId}`).selectAll("*").remove();

//   const radius = Math.min(width, height) / 2;
//   const needleLength = radius * 0.9;

//   const svg = d3
//     .select(`#${containerId}`)
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

//   const g = svg
//     .append("g")
//     .attr("transform", `translate(${width / 2}, ${height})`);

//   const scale = d3.scaleLinear()
//     .domain([min, max])
//     .range([-Math.PI / 2, Math.PI / 2]);

//   // Draw background arc
//   const arc = d3.arc()
//     .innerRadius(radius - 20)
//     .outerRadius(radius)
//     .startAngle(scale(min))
//     .endAngle(scale(max));

//   g.append("path")
//     .attr("d", arc)
//     .attr("fill", "#eee");

//   // Draw ticks
//   const numTicks = 10;
//   const tickData = d3.range(min, max + 1, (max - min) / numTicks);

//   g.selectAll(".tick")
//     .data(tickData)
//     .enter()
//     .append("line")
//     .attr("class", "tick")
//     .attr("x1", d => Math.cos(scale(d)) * (radius - 20))
//     .attr("y1", d => Math.sin(scale(d)) * (radius - 20))
//     .attr("x2", d => Math.cos(scale(d)) * radius)
//     .attr("y2", d => Math.sin(scale(d)) * radius)
//     .attr("stroke", "#333")
//     .attr("stroke-width", 2);

//   // Draw needle
//   const angle = scale(value);
//   const needleLine = d3.line()([
//     [0, 0],
//     [Math.cos(angle) * needleLength, Math.sin(angle) * needleLength],
//   ]);

//   g.append("path")
//     .attr("d", needleLine)
//     .attr("stroke", "red")
//     .attr("stroke-width", 3)
//     .attr("fill", "none");

//   // Draw center circle
//   g.append("circle")
//     .attr("r", 5)
//     .attr("fill", "#333");
// }
