const d3 = require('d3');

const data = [
  {name: "Locke",    value:  4},
  {name: "Reyes",    value:  8},
  {name: "Ford",     value: 15},
  {name: "Jarrah",   value: 16},
  {name: "Shephard", value: 23},
  {name: "Kwon",     value: 42}
];

const margin = { top: 20, right: 30, bottom: 30, left: 40 }
const width = 960 - margin.right - margin.left;
const height = 500 - margin.top - margin.bottom;

const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .rangeRound([0, width])
  .paddingInner(0.1)
  .paddingOuter(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height, 0]);

const xAxis = d3.axisBottom()
  .scale(x);

const yAxis = d3.axisLeft()
  .scale(y);

const chart = d3.select('.chart')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

chart.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis)

chart.append('g')
  .attr('class', 'y axis')
  .call(yAxis)

chart.selectAll('.bar')
    .data(data)
  .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))
    .attr('width', x.bandwidth());
