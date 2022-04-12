import { CommandListController as Super }     from '/layout/components/commandList/CommandListController';

/***
 * layout:  EditTopBarController control buttons
 ***/
// Describe EditTopBarController layout below
const CommandListController   = function(commandListHandler) {

  // Inheritance & private variable ////////////////////////////////////////////
  Super.call(this, commandListHandler);

  // public function ///////////////////////////////////////////////////////////
  Object.assign(this, {
    // trigger_onclickBtnSelect(){
    //   btnSelect.onclick();
    // },
  }, Super.prototype);

  // Lazy Initialization ///////////////////////////////////////////////////////
  // set view
  this.onViewer();
  this.onAdd();
  this.onList();
  this.onSelect();
  this.onSelectsq();
  this.onRemove();
  this.onClear();
  // set tooltips
  this.setTooltipViewer('view filter', 'top', '#555', 1, 0);
  this.setTooltipAdd('add particles', 'top', '#555', 1, 0);
  this.setTooltipList('go to list', 'top', '#555', 1, 0);
  this.setTooltipSelect('select single', 'top', '#555', 1, 0);
  this.setTooltipSelectsq('select by draw square', 'top', '#555', 1, 0, -20);
  this.setTooltipRemove('remove selected', 'top', '#555', 1, 0);
  this.setTooltipClear('clear all', 'top', '#ff5722', 1, 0);


  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CommandListController
};
