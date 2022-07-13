
import _ from 'lodash';
import { IconBtn } from '/layout/components/panel/iconBox/IconBtn';

/***
 * layout:  ActiveBarController control buttons
 ***/
//* Describe ActiveBarController layout below
const IconBoxController = function (_handler) {

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
        me.append(new IconBtn(element));
      });
      const tagArray = Array.from(me.children);
      for (const iterator of tagArray) {
        const obj = $SR.registerModel(iterator).setInteractive();
        const classNames = obj.firstChild.className.split(' ');
        const tempNaming = classNames[classNames.length - 1].split('-');
        tempNaming.shift();
        const naming = _.camelCase(_.join(tempNaming, '-'));
        Object.defineProperty(this, naming, {
          value: obj,
          writable: false
        });
      }
    }
  });
  // access direct to use 'arguments'
  this.adaptStyleAllBtns = function(){
    const args = Array.from(arguments);
    const tagArray = Array.from(me.children);
    for (const iterator of tagArray) {
      args.forEach(element => {
        iterator.classList.add(element);
      });
    }
  }


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
  IconBoxController
}
