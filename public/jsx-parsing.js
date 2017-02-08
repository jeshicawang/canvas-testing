const acorn = require('acorn-jsx');

const fs = require('fs');

fs.readFile('../mytrips/src/components/app.js', 'utf8', (err, data) => {
  if (err) return console.log(err);
  console.log(data);
})

function filterTree(node) {
  const tree = {};
  tree.name = getName(node);
  if (hasChildren(node))
    tree.children = getChildren(node);
  return tree;
}

function hasChildren(node) {
  return node.children && node.children.length;
}

function getChildren(node) {
  return node.children.map(child => filterTree(child));
}

function getName(node) {
  return node.openingElement ? node.openingElement.name.name : node.raw;
}

const code = '<App><h1>MyTrips</h1><Calendar></Calendar></App>'

const ast = acorn.parse(code, {
  plugins: { jsx: true }
});

let node = ast.body[0].expression;

console.log(filterTree(node));
