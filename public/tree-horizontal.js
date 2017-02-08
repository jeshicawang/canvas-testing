const d3 = require('d3');

const data = {
  name: "Root Element",
  children: [
    { name: "First Generation" },
    { name: "First Generation",
      children: [
        { name: "Second Generation" },
        { name: "Second Generation" }
      ]
    },
    { name: "First Generation" },
    { name: "First Generation",
      children: [
        { name: "Second Generation" }
      ]
    },
    { name: "First Generation" }
  ]
}

const root = d3.hierarchy(data, d => d.children ? d.children : null);

const width = 960;
const height = 500;

const svg = d3.select('#tree')
    .attr('width', width)
    .attr('height', height)

const g = svg.append('g')
    .attr('transform', 'translate(160,0)')

const tree = d3.tree()
  .size([height, width - 320]);

const link = g.selectAll('.link')
  .data(tree(root).descendants().slice(1))
  .enter().append('path')
    .attr('class', 'link')
    .attr('d', d => {
      return "M" + d.y + "," + d.x
        + "C" + (d.y + d.parent.y) / 2 + "," + d.x
        + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
        + " " + d.parent.y + "," + d.parent.x;
      });

const node = g.selectAll('.node')
  .data(root.descendants())
  .enter().append('g')
    .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
    .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')

node.append('circle')
  .attr('r', 2.5);

node.append('text')
  .attr('dy', 3)
  .attr('x', d => d.children ? -8 : 8)
  .style('text-anchor', d => d.children ? 'end' : 'start')
  .text(d => {
    console.log(d);
    return d.data.name;
  })
