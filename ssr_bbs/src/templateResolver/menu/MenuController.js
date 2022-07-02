import { MenuItem } from "./MenuItem";
import { MenuItemController } from "./MenuItemController";

/***
 * block:  MenuController
 ***/
// Describe constant Class below
const MenuController   = function(menuHandler, menuList) {

  //* private variable & mapping ////////////////////////////////////////////////
  const _private              = {};
  const menuTemplate          = this.childNodes[1].firstChild.firstChild.childNodes[1];
  const close                 = this.firstChild;

  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  // store in private
  Object.defineProperties(this, {
    position: {
      get: () => {
        const pos = this.getBoundingClientRect();
        return {
          left: pos.left,
          top: pos.top,
          width: pos.width,
          height: pos.height,
          windowScrollX: window.scrollX,
          windowScrollY: window.scrollY,
          loc: window.scrollY + pos.top
        }
      },
      enumerable: true
    },
  });

  //* Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    open(){
      this.style.height = '250px';
      this.style.top = `0px`;
    },
    repositionTop(top) {
      this.style.top = `${top + window.scrollY}px`;
    },
    trigger_close(e){
      close.onclick(e);
    }
    // setTooltipAdd(msg, outline, color, opacity, width, height){
    //   tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // }
  });

  //* Event handler
  // register menu event
  close.onclick = (e) => {
    this.style.height = '0px';
    if ('undefined' !== typeof menuHandler.onclick_close) menuHandler.onclick_close(e);
  }

  //* inject controller /////////////////////////////////////////////////////////
  // viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
  //   update_selectedValue(e, value, id){
  //     viewerFilterDisease = value;
  //     if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
  //   }
  // });

  //* Lazy Initialization ///////////////////////////////////////////////////////
  for (const element of menuList) {
    let menuItem = new MenuItem(element.name);
    menuTemplate.appendChild(menuItem);
    menuItem = $SR.marge(MenuItemController, menuItem, {
      onclick_menuItem: () => import(
          /* webpackChunkName: "loader" */
          `/layout/articles/${element.loc}/loader.js`
        ).then(module => {
          const script = module.default;
          script();
          const articles = document.getElementsByTagName("article");
          const seq = articles.length - 1
          if ('undefined' !== typeof menuHandler.append_article) menuHandler.append_article(articles[seq].id, seq);
        })
    });
  }

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  MenuController
}
