let div = document.createElement('div');
div.id = 'dom-count-dfdsjkh5khg3G3gjk'; // some random unique id
div.style.position = 'fixed';
div.style.bottom = '48px';
div.style.left = '0';
div.style.padding = '6px';
div.style.backgroundColor = 'black';
div.style.color = 'grey';
div.style.fontSize = '12px';
div.style.zIndex = Number.MAX_SAFE_INTEGER;

div.innerText = `DOM count: ${document.getElementsByTagName('*').length}`;

const colors = {
  green_1: '#00ff00',
  green_2: '#00aa00',
  red_1: '#ff0000',
  red_2: '#aa0000',
};

let current_color = 'grey';

setInterval(() => {
  const count = document.getElementsByTagName('*').length;
  if (count > 1000) {
    current_color = current_color === colors.red_1 ? colors.red_2 : colors.red_1;
  } else {
    current_color = current_color === colors.green_1 ? colors.green_2 : colors.green_1;
  }
  div.style.color = current_color;
  div.innerText = `DOM count: ${count}`;
}, 1000);

document.body.appendChild(div);
console.log('Done');
