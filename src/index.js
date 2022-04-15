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
    onclick_close:(_e) => {
      navBar.shiftUp();
    },
    onclick_menu1: (_e) => {
      console.log('clicked');
    },
    navBar_addTab: (id, seq) => navBar.addTab(id, seq),
  });
  navBar = $SR.View('NavBar').inject(NavBarController, {

    onclick_menu: (_e) => {
      menu.open();
      navBar.shiftDown();
    }

  });

}
