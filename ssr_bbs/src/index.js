// import library & font & icons & css
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '/static/css/style.css';

/**
 * task
 *
 * 협력사 정보
 * ## 협력사 정보등록
 * ## 담당자 등록
 *
 * 원산지 확인서
 * ## 신규 등록
 * ## 갱신 및 수정
 *
 * 공지사항
 *
 * window out frame :
 * 1366 x 768
 *
 * 1. edge-out-frame
 * ## width :
 * ## height:
 *
 * 2. setting-frame
 * 3.
 */

// import utility
import { Logger }  from '/class/Logger';

// import class object
function component() {
  const element = document.createElement('div');
  const btn_mod_load = document.createElement('button');
  btn_mod_load.innerHTML = 'load';

  const btn_mod_run = document.createElement('button');
  btn_mod_run.innerHTML = 'run';

  const y = element.getBoundingClientRect().top + window.scrollY;
  const br = document.createElement('br');

  element.innerHTML = _.join(['Hello', 'webpack', y], ' ');
  // element.id = 'main_frame';
  element.appendChild(br);
  element.appendChild(btn_mod_load);
  element.appendChild(btn_mod_run);

  let que = [];
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  btn_mod_load.onclick = () => import(/* webpackChunkName: "print" */ './demo').then(module => {
    const script = module.default;
    que.push(script);
  });

  btn_mod_run.onclick = () => {
    que[0]();
    console.log('hello btn_mod_run');
  }
  return element;
}

document.body.appendChild(component());

