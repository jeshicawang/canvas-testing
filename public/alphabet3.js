const d3 = require('d3');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const width = 960;
const height = 500;

const svg = d3.select('.display')
  .attr('width', width)
  .attr('height', height)

const g = svg.append('g')
  .attr('transform', 'translate(32,' + height / 2 + ')');

update(alphabet);

d3.interval(() => {
  const partAlphabet = d3.shuffle(alphabet).slice(0, Math.floor(Math.random()*26)).sort();
  update(partAlphabet);
}, 3000)

function update(data)  {
  const t = d3.transition()
    .duration(1000);

  const text = g.selectAll('text')
    .data(data, d => d);

  text.exit()
      .attr('class', 'exit')
    .transition(t)
      .attr('y', 60)
      .style('fill-opacity', 1e-6)
      .remove();

  text.attr('class', 'update')
      .attr('y', 0)
      .style('fill-opacity', 1)
    .transition(t)
      .attr('x', (d, i) => i * 32)

  text.enter().append('text')
      .attr('class', 'enter')
      .attr('dy', '.35em')
      .attr('y', -60)
      .attr('x', (d, i) => i * 32)
      .style('fill-opacity', 1e-6)
      .text(d => d)
    .transition(t)
      .attr('y', 0)
      .style('fill-opacity', 1);
}
