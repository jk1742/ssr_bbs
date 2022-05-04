//* import library & font & icons & css ///////////////////////////////////////
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '/static/css/style.css';

//* import utility ////////////////////////////////////////////////////////////
// logger
import { Logger }  from '/class/Logger';
let logger = new Logger();
logger.status = true;
// favicon
import favicon from '/static/favicon/Favicon';

//* import layout /////////////////////////////////////////////////////////////
import { NavBar } from '/layout/components/navBar/NavBar';
import { Menu   } from '/layout/components/menu/Menu';

//* layout ////////////////////////////////////////////////////////////////////
let menu = new Menu('MenuTop');
let navBar = new NavBar('NavBar');

//* appending /////////////////////////////////////////////////////////////////
document.body.appendChild(menu);
document.body.appendChild(navBar);

//* import controller /////////////////////////////////////////////////////////
import { NavBarController   } from '/layout/components/navBar/NavBarController';
import { MenuController     } from '/layout/components/menu/MenuController';

//* event ////////////////////////////////////////////////////////////////////
let sectionEvent = $SR.Event.register('SectionChange');
let queueEvent = $SR.Queue.getInstance();

const displayArticle = (articleId) => {
  const articles = Array.from(document.getElementsByTagName('article'));
  for (const element of articles){
    if (element.id == articleId){
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }
}

const articleRePosition = function (id, seq) {
  const article = document.getElementById(id);
  const sections = Array.from(article.getElementsByTagName('section'));
  for (const e of sections) {
    e.style.width = `${window.innerWidth}px`;
  }
}// articleRePosition end

//* component load ////////////////////////////////////////////////////////////
window.onload = function () {

  favicon();
  menu = $SR.View('MenuTop').inject(MenuController, {
    onclick_close:(_e) => {
      navBar.shiftUp();
    },
    append_article: (articleId, seq) => {
      logger.step(0, 'menu.append_article');
      logger.step(1, 'menu.position:', menu.position, 'scrollY:', window.scrollY);
      logger.step(1, 'navBar.position:', navBar.position, 'scrollY:', window.scrollY);
      if(menu.position.loc > 0) {
        console.log(logger.ind(1),'need fix menu position');
        menu.classList.remove('menu-animate');
        menu.style.top = `0px`;
        _.debounce(function (e) {
          menu.classList.add('menu-animate');
        }, 800)();
      }
      // menu.classList.remove('menu-animate');
      // menu.style.top = `0px`;
      // menu.classList.add('menu-animate');
      // append article to Body
      navBar.addTab(articleId, seq);
      displayArticle(articleId);
      navBar.remoteTabActive(articleId);
    },
  });

  navBar = $SR.View('NavBar').inject(NavBarController, {
    onclick_menu: (_e) => {
      logger.step(0, 'navBar.onclick_menu');
      console.log(logger.ind(1), 'menu.position:', menu.position, 'scrollY:', window.scrollY);
      console.log(logger.ind(1), 'navBar.position:', navBar.position, 'scrollY:', window.scrollY);
      // window.scrollTo({ top: 0 });
      // navBar.style.top = `0`;// top
      // menu.style.top = `0`;
      menu.open();
      navBar.shiftDown();
    },
    onclick_tab: (articleId, seq) => {
      window.scrollTo({ top: 0 });
      navBar.style.top = `0`;
      menu.style.top = `0`;
      // skip this when equal target articleId with current ArticleId
      if (navBar.focusArticleId == articleId) return;
      // animation screen move tab
      displayArticle(articleId);
      // register focused articleId
      navBar.focusArticleId = articleId;
      articleRePosition(articleId, seq);
    },
    onclick_close: (articleId) => {
      if (navBar.focusArticleId == articleId) navBar.style.top = '0px';
      const article = document.getElementById(articleId);
      article.remove();
    }
  });
  // fix nav bar width
  navBar.style.width = window.innerWidth;
  // queueEvent
  queueEvent.onQueuePush = (e) => {
    const cur = document.getElementById(e.detail.getMessage().id);
    const loc = cur.getBoundingClientRect().top;
    navBar.classList.remove('nav-bar-animate');
    navBar.repositionTop(loc);
    _.debounce(function (e) {
      navBar.classList.add('nav-bar-animate');
    }, 800)();
    menu.repositionTop(loc);
    logger.step(0, 'queueEvent.onQueuePush');
    logger.step(1, 'menu.position:', menu.position, 'scrollY:', window.scrollY);
    logger.step(1, 'navBar.position:', navBar.position, 'scrollY:', window.scrollY);
  }

}

