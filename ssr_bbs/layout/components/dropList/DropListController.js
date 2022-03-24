import { DropListContents           }  from '/layout/components/dropList/DropListContents';
import { DropListContentsController }  from '/layout/components/dropList/DropListContentsController';


/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const DropListController   = function(dropListHandler) {

  // private variable & mapping ////////////////////////////////////////////////
  const me                    = this;
  const trigger               = me.firstChild;
  const dropListContentsId    = me.id + '-Contents';
  let   arrContents           = [];
  let   selected              = '';

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    arrayContents:{
      get:() => arrContents,
      enumerable:true
    },
    selected:{
      get:() => selected,
      enumerable:true
    },
  });

  // Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    generateList(array){
      arrContents = array;
      const list = new DropListContents(dropListContentsId, arrContents);
      me.appendChild(list);
      const rows = document.getElementById(dropListContentsId).getElementsByTagName('a');
      for (let i = 0; i < rows.length; i++) {
        $SR.View(rows[i].id).inject(DropListContentsController, {
          onclick_this(e, value, id){
            selected = value;
            trigger.innerHTML = value;
            if('undefined' !== typeof dropListHandler.update_selectedValue) dropListHandler.update_selectedValue(e, value, id);
          }
        });
      }
    }
  });

  // Event handler /////////////////////////////////////////////////////////////
  // viewer.onclick = (e) => {
  //   if('undefined' !== typeof commandListHandler.onclick_viewer) commandListHandler.onclick_viewer(e, viewtype);
  // }

  // Lazy Initialization ///////////////////////////////////////////////////////
  trigger.innerHTML = 'None';

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  DropListController
};
