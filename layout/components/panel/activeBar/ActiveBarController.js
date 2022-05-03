
import { ActiveBtn } from '/layout/components/panel/activeBar/ActiveBtn';

/***
 * layout:  ActiveBarController control buttons
 ***/
//* Describe ActiveBarController layout below
const ActiveBarController = function (activeBarHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const me    = this;
  let   oven  = [];

  //* Privilege Static Functions ////////////////////////////////////////////////

  //* Access Control: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   list  :{ get: () => list }
  // });

  //* Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    appendToOven:(icon) => {
      oven.push(icon);
    },
    bake:() => {
      oven.forEach(element => {
        me.append(new ActiveBtn(element));
      });
      const tagArray = Array.from(me.children);
      for (const iterator of tagArray) {
        const obj = $SR.registerModel(iterator).setInteractive();
        const classNames = obj.firstChild.className.split('-');
        Object.defineProperty(this, classNames[classNames.length - 1], {
          value: obj,
          writable: false
        });
      }
    },
  });

  //* Event handler /////////////////////////////////////////////////////////////
  // upside.onclick = (e) => {
  //   if('undefined' !== typeof panelNavHandler.onclick_upside) panelNavHandler.onclick_upside(e);
  // }

  //* Lazy Initialization ///////////////////////////////////////////////////////
  // how to set items
  // activeBar.appendToOven("fa-solid fa-brain");
  // activeBar.appendToOven("fa-solid fa-briefcase");
  // activeBar.bake();


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ActiveBarController
};
