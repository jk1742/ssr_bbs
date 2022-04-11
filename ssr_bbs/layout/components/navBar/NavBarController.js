import { NavTab } from "./NavTab";
import { NavTabController } from "/layout/components/navBar/NavTabController";


/***
 * block: Navigation bar
 ***/
// Describe constant Class below
const NavBarController   = function(navBarHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const me                    = this;
  const template              = me.firstChild;
  const navFrame              = template.firstChild.firstChild;
  const menu                  = navFrame.childNodes[0].firstChild;

  //* Privilege Static Functions //////////////////////////////////////////////
  const navClassRemove  = function(){
    const array = [select, selectSq];
    array.forEach(function(e){
      e.classList.remove(FOCUS_CLASS);
    });
  };
  const getPositionInfo = function(e, t){
    return {
      left  : t.left,
      top   : t.top,
      width : t.width,
      height: t.height,
      pageX : e.pageX,
      pageY : e.pageY
    }
  }

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    // tooltipSwitch:{
    //   set: function(o) {
    //     swTooltip = o;
    //   },
    //   get: function() {
    //     return swTooltip;
    //   }
    // },
    // viewerFilterDisease:{
    //   get:() => viewerFilterDisease,
    //   enumerable:true
    // }
  });

  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    addTab(obj){
      // add tab and generate ID
      const tabId = "navTab-" + $SR.uuidv4();
      let tab = new NavTab(tabId, "sample tab 1", "fas fa-info", "styles", "alt");
      navFrame.appendChild(tab);
      // inject controller
      tab = $SR.View(tab.id).inject(NavTabController, {
        onclick_item  :(e) => {
          // if ( document.getElementById("MyElement").classList.contains('MyClass') )
          console.log("addTab ", me);
          console.log("clicked item " + tab.id);
        },
        onclick_close :(e) => {
          console.log("clicked close " + tab.id);
        },
      });
      // is first contents on nav

      // navBarFrame-list
      //  yes then show and focus
      //  no then just add contents
    },
    // setTooltipAdd(msg, outline, color, opacity, width, height){
    //   tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // },

  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register event
  menu.onclick = (e) => {
    if('undefined' !== typeof navBarHandler.onclick_menu) navBarHandler.onclick_menu(e);
  };

  //* inject controller ///////////////////////////////////////////////////////
  // viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
  //   update_selectedValue(e, value, id){
  //     viewerFilterDisease = value;
  //     if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
  //   }
  // });

  //* Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  NavBarController
};
