// import library & font & icons & css
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '/static/css/style.css';

/**
 * task
 * <i class="fa-solid fa-chart-tree-map"></i>
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
import { NavBar } from '/layout/components/navBar/NavBar';

import { NavBarController    } from '/layout/components/navBar/NavBarController';

const navBar    = new NavBar('NavBar');

document.body.appendChild(navBar);

let que = [];

let topMenu        = $SR.View('NavBar').inject(NavBarController, {

  onclick_menu  :(e)  => import(/* webpackChunkName: "loader" */ '../layout/article_sample/loader').then(module => {
    // load script
    const script = module.default;
    // run script
    script();
    // get que seq number
    const articles =  document.getElementsByTagName("article");
    const seq = articles.length -1
    // extract tab info
    topMenu.addTab(articles[seq].id, seq);
  })

});

