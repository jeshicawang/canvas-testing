const d3 = require('d3');

const data = [
  {name: "Locke",    value:  4},
  {name: "Reyes",    value:  8},
  {name: "Ford",     value: 15},
  {name: "Jarrah",   value: 16},
  {name: "Shephard", value: 23},
  {name: "Kwon",     value: 42}
];

const width = 960;
const height = 500;


const scaleY = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height, 0]);

const chart = d3.select('.chart')
  .attr('width', width)
  .attr('height', height);

const barWidth = width / data.length;

const bar = chart.selectAll('g')
    .data(data)
  .enter().append('g')
    .attr('transform', (d, i) => 'translate(' + i * barWidth + ',0)');

bar.append('rect')
  .attr('width', barWidth - 1)
  .attr('height', d => height - scaleY(d.value))
  .attr('y', d => scaleY(d.value))

bar.append('text')
  .attr('x', barWidth / 2)
  .attr('y', d => scaleY(d.value) + 3)
  .attr('dy', '.75em')
  .text(d => d.value)
