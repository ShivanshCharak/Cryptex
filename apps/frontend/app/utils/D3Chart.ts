import * as d3 from "d3";

export function createGauge({
  containerId,
  value = 50,
  min = 0,
  max = 100,
  width = 300,
  height = 200,
}) {
  // Remove any previous svg
  d3.select(`#${containerId}`).selectAll("*").remove();

  const radius = Math.min(width, height) / 2;
  const needleLength = radius * 0.9;

  const svg = d3
    .select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height})`);

  const scale = d3.scaleLinear()
    .domain([min, max])
    .range([-Math.PI / 2, Math.PI / 2]);

  // Draw background arc
  const arc = d3.arc()
    .innerRadius(radius - 20)
    .outerRadius(radius)
    .startAngle(scale(min))
    .endAngle(scale(max));

  g.append("path")
    .attr("d", arc)
    .attr("fill", "#eee");

  // Draw ticks
  const numTicks = 10;
  const tickData = d3.range(min, max + 1, (max - min) / numTicks);

  g.selectAll(".tick")
    .data(tickData)
    .enter()
    .append("line")
    .attr("class", "tick")
    .attr("x1", d => Math.cos(scale(d)) * (radius - 20))
    .attr("y1", d => Math.sin(scale(d)) * (radius - 20))
    .attr("x2", d => Math.cos(scale(d)) * radius)
    .attr("y2", d => Math.sin(scale(d)) * radius)
    .attr("stroke", "#333")
    .attr("stroke-width", 2);

  // Draw needle
  const angle = scale(value);
  const needleLine = d3.line()([
    [0, 0],
    [Math.cos(angle) * needleLength, Math.sin(angle) * needleLength],
  ]);

  g.append("path")
    .attr("d", needleLine)
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("fill", "none");

  // Draw center circle
  g.append("circle")
    .attr("r", 5)
    .attr("fill", "#333");
}
