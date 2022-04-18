import { MenuItem } from "/layout/components/menu/MenuItem";
import { MenuItemController } from "/layout/components/menu/MenuItemController";

/***
 * block:  MenuController
 ***/
// Describe constant Class below
const MenuController   = function(menuHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const _private              = {};
  const close                 = this.firstChild;
  const array                 = [
    {
      name: 'sample1',
      loc: 'sample1'
    }, {
      name: 'sample2',
      loc: 'sample2'
    }
  ];

  // console.log('MenuController', menu1);

  //* Privilege Static Functions ////////////////////////////////////////////////
  // const  getPositionInfo = function(e, t){
  //   return {
  //     left  : t.left,
  //     top   : t.top,
  //     width : t.width,
  //     height: t.height,
  //     pageX : e.pageX,
  //     pageY : e.pageY
  //   }
  // }

  //* Access Control: getter & setter ///////////////////////////////////////////
  // store in private
  Object.defineProperties(this, {
    // articleId:{
    //   set:(str) => {_private.articleId = str},
    //   get:() => _private.articleId,
    //   enumerable:true
    // }
  });

  //* Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    open(){
      this.style.height = '250px';
    },
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
  for (const element of array) {
    let menuItem = new MenuItem(element.name);
    this.appendChild(menuItem);
    menuItem = $SR.marge(MenuItemController, menuItem, {
      onclick_menuItem: () => import(
          /* webpackChunkName: "loader" */
          `/layout/articles/${element.loc}/loader.js`
        ).then(module => {
          const script = module.default;
          script();
          const articles = document.getElementsByTagName("article");
          const seq = articles.length - 1
          if ('undefined' !== typeof menuHandler.navBar_addTab) menuHandler.navBar_addTab(articles[seq].id, seq);
        })
    });
  }

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  MenuController
};
