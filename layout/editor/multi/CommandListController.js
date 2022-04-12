import { CommandListController as Super}     from '/layout/components/commandList/CommandListController';
/***
 * Layout:  SelectDiseaseController
 ***/

// Describe EntryList Class below
const CommandListController = function (commandListHandler) {

  // Inheritance & private variable ////////////////////////////////////////////
  Super.call(this, commandListHandler);

  // mapping ///////////////////////////////////////////////////////////////////

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // buildInnerDragItem(el){
    //   let text  = imgTagging(el.img);
    //   return text;
    // },
  }, Super.prototype);

  // Event handler /////////////////////////////////////////////////////////////

  // Lazy Initialization ///////////////////////////////////////////////////////
  this.onAdd();
  this.onRemove();
  this.onClear();
  this.setTooltipAdd('add particles', 'top', '#555', 1, 0);
  this.setTooltipList('go to list', 'top', '#555', 1, 0);
  this.setTooltipSelect('select single', 'top', '#555', 1, 0);
  this.setTooltipSelectsq('select by draw square', 'top', '#555', 1, 0);
  this.setTooltipRemove('remove selected', 'top', '#555', 1, 0);
  this.setTooltipClear('clear all', 'top', '#555', 1, 0);

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CommandListController
};
