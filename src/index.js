//* import library & font & icons & css ///////////////////////////////////////
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '/static/css/style.css';

//* import utility ////////////////////////////////////////////////////////////
import { Logger }  from '/class/Logger';
import favicon from '/static/favicon/Favicon';

//* import layout /////////////////////////////////////////////////////////////
import { NavBar } from '/layout/components/navBar/NavBar';
import { Menu   } from '/layout/components/menu/Menu';

//* layout ////////////////////////////////////////////////////////////////////
let menu = new Menu('MenuTop');
let navBar    = new NavBar('NavBar');

//* appending /////////////////////////////////////////////////////////////////
document.body.appendChild(menu);
document.body.appendChild(navBar);

//* import controller /////////////////////////////////////////////////////////
import { NavBarController   } from '/layout/components/navBar/NavBarController';
import { MenuController     } from '/layout/components/menu/MenuController';


//* component load ////////////////////////////////////////////////////////////
window.onload = function () {
  favicon();
  menu = $SR.View('MenuTop').inject(MenuController, {
    onclick_close:(e) => {
      navBar.shiftUp();
    }
  });
  navBar = $SR.View('NavBar').inject(NavBarController, {

    onclick_menu: (e) => import(/* webpackChunkName: "loader" */ '../layout/article_sample/loader').then(module => {
      // load script
      const script = module.default;
      // run script
      script();
      // get que seq number
      const articles = document.getElementsByTagName("article");
      const seq = articles.length - 1
      // extract tab info
      navBar.addTab(articles[seq].id, seq);

      menu.open();
      navBar.shiftDown();
    })

  });

}
