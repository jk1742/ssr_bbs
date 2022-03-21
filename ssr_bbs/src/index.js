import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  const btn_mod_load = document.createElement('button');
  btn_mod_load.innerHTML = 'load';

  const btn_mod_run = document.createElement('button');
  btn_mod_run.innerHTML = 'run';

  const br = document.createElement('br');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.id = 'main_frame';
  element.appendChild(br);
  element.appendChild(btn_mod_load);
  element.appendChild(btn_mod_run);
  let que = [];
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  btn_mod_load.onclick = () => import(/* webpackChunkName: "print" */ './print').then(module => {
    const script = module.default;
    que.push(script);
  });

  btn_mod_run.onclick = () => {
    que[0]();
    // console.log('hello btn_mod_run');
  }
   return element;
}

document.body.appendChild(component());

