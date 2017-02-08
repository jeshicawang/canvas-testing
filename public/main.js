const d3 = require('d3');

const data = [4, 8, 15, 16, 23, 42];

d3.select('.chart')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .style('width', (d) => d*10 + 'px')
    .text((d) => d)
