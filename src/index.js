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
import { Intro  } from '/layout/intro/Intro';

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
document.body.classList.add('scroll-bar-hide');
document.body.appendChild(menu);
document.body.appendChild(navBar);
document.body.appendChild(intro);

//* event ////////////////////////////////////////////////////////////////////
// let sectionEvent = $SR.Event.register('SectionChange');
let activities = $SR.Queue.getInstance();

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

const articleRePosition = function (articleId, seq) {
  const article = document.getElementById(articleId);
  // get css setting values
  const skeleton = $SR.Skeleton.getInstance();
  const section_PaddingTop = skeleton.section.getIntValue('padding-top');
  const frameTop_height = skeleton.frameTop.getIntValue('height');
  const frameMid_height = skeleton.frameMid.getIntValue('height');
  // section build shape
  const sections = Array.from(article.getElementsByTagName('section'));
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const window_verticalHeight = (i * 100);
    section.style.width = `${window.innerWidth}px`;
    // frame-top null check and input height value
    let frameTop = section.getElementsByClassName('frame-top');
    if (0 < frameTop.length) {
      const element = frameTop[0];
      element.style.position = 'absolute';
      element.style.width = '100%';
      element.style.top = `${section_PaddingTop + window_verticalHeight}vh`;
    }
    // frame-mid null check and input height value
    let frameMid = section.getElementsByClassName('frame-mid');
    if (0 < frameMid.length) {
      const element = frameMid[0];
      element.style.height = `${skeleton.frameMid.getIntValue('height')}vh`;
      element.style.position = 'absolute';
      element.style.width = '100%';
      element.style.top = `${section_PaddingTop + frameTop_height + window_verticalHeight}vh`;
    }
    // frame-mid null check and input height value
    let frameBtm = section.getElementsByClassName('frame-btm');
    if (0 < frameBtm.length) {
      const element = frameBtm[0];
      element.style.position = 'absolute';
      element.style.width = '100%';
      element.style.top = `${section_PaddingTop + frameTop_height + frameMid_height + window_verticalHeight}vh`;
    }
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
      // logger.step(0, 'navBar.onclick_menu');
      // console.log(logger.ind(1), 'menu.position:', menu.position, 'scrollY:', window.scrollY);
      // console.log(logger.ind(1), 'navBar.position:', navBar.position, 'scrollY:', window.scrollY);
      menu.open();
      navBar.shiftDown();
    },
    onclick_menuClose:(_e) => {
      menu.trigger_close(_e);
    },
    onclick_tab: (articleId, seq) => {
      window.scrollTo({ top: 0 });
      // menu.trigger_close();
      // skip this when equal target articleId with current ArticleId
      if (navBar.focusArticleId == articleId) return;
      // animation screen move tab
      displayArticle(articleId);
      // register focused articleId
      navBar.focusArticleId = articleId;
      // article reposition with position:absolute
      const article = document.getElementById(articleId);
      if (article.scrollLock) {
        articleRePosition(articleId, seq);
      }
    },
    onclick_close: (articleId) => {
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

  intro = $SR.getModelById('Intro').inject(IntroController, {});

  // queueEvent
  activities.onQueuePush = (e) => {
    const cur = document.getElementById(e.detail.getMessage().id);
    const loc = cur.getBoundingClientRect().top;
    const msg = e.detail.getMessage();
    console.log('activities.onQueuePush');
    console.log('  message ', msg.id);
    console.log('  message ', msg.name);
    console.log('  message ', msg.detail);
    console.log('  message ', msg.timestamp);
    console.log('  message ', msg.hash);
  }
  // navBar.position.height
}

