//* import library & font & icons & css ///////////////////////////////////////
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '/static/css/style.css';
import '/static/css/bulma.css';
// import '/static/css/bulma_style.css';

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
import { Intro } from '/layout/intro/Intro';

//* import controller /////////////////////////////////////////////////////////
import { NavBarController } from '/layout/components/navBar/NavBarController';
import { MenuController } from '/layout/components/menu/MenuController';
import { IntroController } from '/layout/intro/IntroController';

//* layout ////////////////////////////////////////////////////////////////////
let menu = new Menu('MenuTop');
let navBar = new NavBar('NavBar');
let intro = new Intro('Intro');

//* initialize appending ///////////////////////////////////////////////////////
// meta tag
let meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1";
document.getElementsByTagName('head')[0].appendChild(meta);
// menu and nav
document.body.classList.add('skepticalBody');
document.body.appendChild(menu);
document.body.appendChild(navBar);
document.body.appendChild(intro);

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
      navBar.reveal_menuOpen();
    },
    append_article: (articleId, seq) => {
      // append article to Body
      navBar.addTab(articleId, seq);
      displayArticle(articleId);
      navBar.remoteTabActive(articleId);
      navBar.revealNavbar();
      intro.hideIntro();
    },
  });

  navBar = $SR.View('NavBar').inject(NavBarController, {
    onclick_menuOpen: (_e) => {
      logger.step(0, 'navBar.onclick_menu');
      console.log(logger.ind(1), 'menu.position:', menu.position, 'scrollY:', window.scrollY);
      console.log(logger.ind(1), 'navBar.position:', navBar.position, 'scrollY:', window.scrollY);
      menu.open();
      navBar.shiftDown();
    },
    onclick_menuClose:(_e) => {
      menu.trigger_close(_e);
    },
    onclick_tab: (articleId, seq) => {
      window.scrollTo({ top: 0 });
      // skip this when equal target articleId with current ArticleId
      if (navBar.focusArticleId == articleId) return;
      // animation screen move tab
      displayArticle(articleId);
      // register focused articleId
      navBar.focusArticleId = articleId;
      articleRePosition(articleId, seq);
    },
    onclick_close: (articleId) => {
      // if (navBar.focusArticleId == articleId) navBar.style.top = '0px';
      const article = document.getElementById(articleId);
      article.remove();
      if(navBar.sizeTabs() <= 0) {
        navBar.hideNavbar();
        intro.revealIntro();
      }
    }
  });
  // fix nav bar width
  navBar.style.width = window.innerWidth;

  intro = $SR.View('Intro').inject(IntroController, {});
  intro.setPaddingTop(navBar.position.height);

  // queueEvent
  queueEvent.onQueuePush = (e) => {
    const cur = document.getElementById(e.detail.getMessage().id);
    const loc = cur.getBoundingClientRect().top;
    // navBar.repositionTop(loc);
    // menu.repositionTop(loc);
    logger.step(0, 'queueEvent.onQueuePush');
    logger.step(1, 'menu.position:', menu.position, 'scrollY:', window.scrollY);
    logger.step(1, 'navBar.position:', navBar.position, 'scrollY:', window.scrollY);
  }
  // navBar.position.height
}

