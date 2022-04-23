//* import library & font & icons & css ///////////////////////////////////////
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '/static/css/style.css';

//* import utility ////////////////////////////////////////////////////////////
import { _logger }  from '/class/Logger';
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

//* event ////////////////////////////////////////////////////////////////////
let sectionEvent = $SR.Event.register('SectionChange');

const getMarginById = (str)=>{
  const nav = document.getElementById(str);
  return nav.getBoundingClientRect().height;
}

const activeArticle = (articleId) => {
  const articles = Array.from(document.getElementsByTagName('article'));
  for (const element of articles){
    if (element.id == articleId){
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }
}

const articleRePosition = function (id, seq, topMargin) {
  console.log('topMargin', topMargin);
  const article = document.getElementById(id);
  const sections = Array.from(article.getElementsByTagName('section'));
  const window_Height = window.innerHeight;
  const constent_height = window_Height - topMargin;
  // const innerWidth = window.innerWidth;
  // const outHeight = inHeight - topMargin;
  for (const e of sections) {
  //   // cont_main fix
  //   let mainContent = e.getElementsByClassName('cont_main')[0];
  //   console.log(`mainContent`, mainContent);
  //   let topHeight = 0;
  //   let btmHeight = 0;
  //   console.log(`${inHeight}, ${outHeight}`);
  //   e.style.height = `${outHeight}px`;
    e.style.width = `${window.innerWidth}px`;
  //  let topElements = e.getElementsByClassName('frame-top');
  //   if (0 < topElements.length) {
  //     const el = topElements[0];
  //     topHeight = el.getBoundingClientRect().height;
  //   }
  //   let bottomElements = e.getElementsByClassName('frame-btm');
  //   if (0 < bottomElements.length) {
  //     const elBtm = bottomElements[0];
  //     elBtm.style.width = `${innerWidth}px`;
  //   }
  }
}// buildFrame end




//* component load ////////////////////////////////////////////////////////////
window.onload = function () {
  let navBarMargin;
  favicon();
  menu = $SR.View('MenuTop').inject(MenuController, {
    onclick_close:(_e) => {
      navBar.shiftUp();
    },
    navBar_addTab: (id, seq) => {
      navBar.addTab(id, seq);
      // expend body width size
      const articles = Array.from(document.getElementsByTagName('article'));
      const articlesLength = articles.length;
      const bodyWidth = window.innerWidth;
      document.body.style.width = `${articlesLength * bodyWidth}px`;
      // get article and sections
      const topMargin = getMarginById(navBar.id)
      articleRePosition(id, seq, topMargin);
    },
  });

  navBar = $SR.View('NavBar').inject(NavBarController, {
    onclick_menu: (_e) => {
      menu.open();
      navBar.shiftDown();
    },
    onclick_tab: (articleId,seq) => {
      // TODO animation screen move tab
      activeArticle(articleId);
      navBar.style.top = '0px';
      // TODO register focused articleId
      navBar.focusArticleId = articleId;
      const topMargin = getMarginById(navBar.id);
      articleRePosition(articleId, seq, topMargin);
    },
    onclick_close: (articleId) => {
      console.log('self kill', )
      const article = document.getElementById(articleId);
      article.remove();
    }
  });

  // fix nav bar width
  navBar.style.width = window.innerWidth;

  sectionEvent.onSectionChange = (e) => {
    const cur = document.getElementById(e.detail.getMessage().id);
    const loc = cur.getBoundingClientRect().top;
    navBar.style.top = loc + window.scrollY;
  }

}

