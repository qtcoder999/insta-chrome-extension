(function () {

  var port = chrome.runtime.connect();
  port.onMessage.addListener(function (msg) {
    switch (msg.action) {
      case 'click_icon':
        if (localStorage.getItem('dom_count_hide') === "true") {
          localStorage.removeItem('dom_count_hide');
        } else {
          localStorage.setItem('dom_count_hide', "true");
        }
        div.style.display = localStorage.getItem('dom_count_hide') ? 'none' : 'block';
        break;
    }
  });

  let div = document.createElement('div');
  div.id = 'dom-count-dfdsjkh5khg3G3gjk'; // some random unique id
  div.style.display = localStorage.getItem('dom_count_hide') ? 'none' : 'block';
  div.style.position = 'fixed';
  div.style.padding = '6px';
  div.style.backgroundColor = '#FAFAFA';
  div.style.borderRadius = '2px';
  div.style.boxShadow = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
  div.style.color = 'grey';
  div.style.opacity = 0.9;
  div.style.fontSize = '12px';
  div.style.zIndex = Number.MAX_SAFE_INTEGER;
  div.style.cursor = 'move';
  div.title = 'DOM elements count on this page. Auto refresh every second. Drag me around. Click on extension icon to hide/show.';

  // initial position remember after refresh
  if (localStorage.getItem('dom_count_pos_top')) {
    div.style.top = localStorage.getItem('dom_count_pos_top');
  } else {
    div.style.bottom = '48px';
  }
  div.style.left = localStorage.getItem('dom_count_pos_left') || '0px';

  div.innerText = document.getElementsByTagName('*').length;

  const colors = {
    green_1: '#8BC34A',
    green_2: '#4CAF50',
    orange_1: '#FFC107',
    orange_2: '#FF9800',
    red_1: '#f44336',
    red_2: '#e53935',
  };

  let current_color = 'grey';

  let last_left = div.style.left;
  let last_top = div.style.top;


  // REFRESH data
  setInterval(() => {
    if (last_left !== div.style.left || last_top !== div.style.top) {
      last_left = div.style.left;
      last_top = div.style.top;
      localStorage.setItem('dom_count_pos_left', last_left);
      localStorage.setItem('dom_count_pos_top', last_top);
    }

    // if out of viewport - reset location
    if (window.innerHeight < parseInt(last_top)) {
      div.style.top = `${window.innerHeight - 48}px`;
    }
    if (window.innerWidth < parseInt(last_left)) {
      div.style.left = `${window.innerWidth - 48}px`;
    }

    const count = document.getElementsByTagName('*').length;

    if (count > 2000) {
      current_color = current_color === colors.red_1 ? colors.red_2 : colors.red_1;
    } else if (count > 1000) {
      current_color = current_color === colors.orange_1 ? colors.orange_2 : colors.orange_1;
    } else {
      current_color = current_color === colors.green_1 ? colors.green_2 : colors.green_1;
    }
    div.style.display = localStorage.getItem('dom_count_hide') ? 'none' : 'block';
    div.style.color = current_color;
    div.innerText = count;
  }, 1000);

// move
  const divMove = (e) => {
    div.style.top = `${e.clientY - 15}px`;
    delete div.style.bottom;
    div.style.left = `${e.clientX - 13}px`;
  };
  const mouseDown = () => {
    window.addEventListener('mousemove', divMove, true);
  };
  const mouseUp = () => {
    window.removeEventListener('mousemove', divMove, true);
  };

  div.addEventListener('mousedown', mouseDown, false);
  div.addEventListener('mouseup', mouseUp, false);

  document.body.appendChild(div);

})();
