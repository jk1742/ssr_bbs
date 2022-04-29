import { NavTab } from "./NavTab";
import { NavTabController } from "/layout/components/navBar/NavTabController";


/***
 * block: Navigation bar
 ***/
// Describe constant Class below
const NavBarController   = function(navBarHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private = {
    loc:0,
    focusArticleId:''
  };
  const navFrame = this.firstChild.childNodes[1].firstChild.firstChild;
  const menuOpen = this.firstChild.firstChild.firstChild;
  const menuClose = this.firstChild.firstChild.childNodes[1];
  const FOCUS                 = 'is-active';
  // console.log("NavBarController:", navFrame);

  //* Privilege Static Functions //////////////////////////////////////////////
  const arrayTabs = () => {
    return [...navFrame.getElementsByTagName('li')];
  }

  const focusRemove  = function(){
    arrayTabs().forEach(function(e){
      e.classList.remove(FOCUS);
    });
  };

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    position: {
      get: () => {
        const pos = this.getBoundingClientRect();
        return {
          left          : pos.left,
          top           : pos.top,
          width         : pos.width,
          height        : pos.height,
          windowScrollX : window.scrollX,
          windowScrollY : window.scrollY,
          loc: window.scrollY + pos.top,
          windowTop: window.scrollY + pos.top,
        }
      },
      enumerable: true
    },
    focusArticleId: {
      set: (str) => { _private.focusArticleId = str },
      get: () => _private.focusArticleId,
      enumerable: true
    },
  });

  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    addTab(articleId, seq){
      // add tab and generate ID
      const tabId = "navTab-" + articleId;
      const article = document.getElementById(articleId);
      const tabAltTxt = 'A tab of ' + article.getAttribute('alt');
      let tab = new NavTab(tabId, article.subject, article.getAttribute('data-icon'), tabAltTxt, "");
      navFrame.appendChild(tab);
      // inject controller
      tab = $SR.View(tab.id).inject(NavTabController, {
        onclick_item  :(e) => {
          if ('undefined' !== typeof navBarHandler.onclick_tab) navBarHandler.onclick_tab(articleId, tab.getAttribute('data-index'));
          focusRemove();
          tab.classList.add(FOCUS);
          this.focusArticleId = articleId;
        },
        onclick_close :(e) => {
          tab.remove();
          this.sortTabs();
          if ('undefined' !== typeof navBarHandler.onclick_close) navBarHandler.onclick_close(articleId);
        },
      });
      // set index
      tab.setAttribute('data-index', seq);
      // set articleId on tab
      tab.articleId = articleId;
      // event
    },
    shiftDown(){
      this.style.marginTop = "250px";
    },
    shiftUp() {
      this.style.marginTop = "0px";
    },
    sortTabs() {
      const array = arrayTabs();
      for (let i = 0; i < array.length; i++) {
        array[i].setAttribute('data-index',i);
      }
    },
    remoteTabActive(articleId){
      arrayTabs().forEach(function (e) {
        if (e.articleId == articleId) {
          e.trigger_onclickItem();
        }
      });
    },
    repositionTop(top){
      this.style.top = `${top + window.scrollY}px`;
    },
    reveal_menuOpen(){
      menuOpen.style.display = 'block';
      menuClose.style.display = 'none';
    },
    hideNavbar(_e){
      // visibility: visible;
      navFrame.style.visibility = 'hidden';
    },
    revealNavbar(_e){
      navFrame.style.visibility = 'visible';
    },
    sizeTabs: () => arrayTabs().length
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register event
  menuOpen.onclick = (e) => {
    menuOpen.style.display = 'none';
    menuClose.style.display = 'block';
    if ('undefined' !== typeof navBarHandler.onclick_menuOpen) navBarHandler.onclick_menuOpen(e);
  };
  menuClose.onclick = (e) => {
    menuOpen.style.display = 'block';
    menuClose.style.display = 'none';
    if ('undefined' !== typeof navBarHandler.onclick_menuClose) navBarHandler.onclick_menuClose(e);
  };

  //* inject controller ///////////////////////////////////////////////////////
  // viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
  //   update_selectedValue(e, value, id){
  //     viewerFilterDisease = value;
  //     if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
  //   }
  // });

  //* Lazy Initialization /////////////////////////////////////////////////////
  menuClose.style.display = 'none';
  this.hideNavbar();

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  NavBarController
};
