const d3 = require('d3');

const data = [
  {name: "Locke",    value:  4},
  {name: "Reyes",    value:  8},
  {name: "Ford",     value: 15},
  {name: "Jarrah",   value: 16},
  {name: "Shephard", value: 23},
  {name: "Kwon",     value: 42}
];

const width = 420;
const barHeight = 20;

const scale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([0, 420]);

var chart = d3.select('.chart')
  .attr('width', width)
  .attr('height', barHeight * data.length);

var bar = chart.selectAll('g')
    .data(data)
  .enter().append('g')
    .attr('transform', (d, i) => 'translate(0,' + i * barHeight + ')');

bar.append('rect')
  .attr('width', d => scale(d.value))
  .attr('height', barHeight - 1);

bar.append('text')
  .attr('x', d => scale(d.value) - 3)
  .attr('y', barHeight / 2)
  .attr('dy', '.35em')
  .text(d => d.value)
