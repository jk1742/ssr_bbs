
import _ from 'lodash';
import { DynamicBtn } from '/layout/components/panel/dynamicBox/DynamicBtn';

/***
 * layout:  ActiveBarController control buttons
 ***/
//* Describe ActiveBarController layout below
const DynamicBoxController = function (_dynamicBoxHandler) {

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
        me.append(new DynamicBtn(element));
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
  DynamicBoxController
};
