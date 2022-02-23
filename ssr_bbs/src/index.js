import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  button.innerHTML = 'load';

  const btn2 = document.createElement('button');
  btn2.innerHTML = 'clear button';

  const br = document.createElement('br');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);
  element.appendChild(btn2);
  let que = [];
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const scrpt = module.default;
    que.push(scrpt);
  });
  btn2.onclick = e => {
    que[0]();
    // console.log('hello btn2');
  }
   return element;
}

document.body.appendChild(component());

