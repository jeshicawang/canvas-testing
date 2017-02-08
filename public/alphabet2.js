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
  const text = g.selectAll('text')
    .data(data, d => d);

  text.attr('class', 'update');

  text.enter().append('text')
      .attr('class', 'enter')
      .attr('dy', '.35em')
      .text(d => d)
    .merge(text)
      .attr('x', (d, i) => i * 32);

  text.exit().remove();
}
