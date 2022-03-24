import { SelectGroupController as Super}     from '/layout/components/selectGroup/SelectGroupController';
/***
 * Layout:  SelectDiseaseController
 ***/

// Describe EntryList Class below
const SelectSocialGPController = function (selectSocialGPHandler) {

  // Inheritance & private variable ////////////////////////////////////////////
  Super.call(this, selectSocialGPHandler);

  // Event handler /////////////////////////////////////////////////////////////
  const goalZone = this.getElementsByClassName('drag-dropdown-zone')[0];

  // Privilige Static Functions ////////////////////////////////////////////////
  const tagging = function(name, value){
    let carriage        = '';
    const labelName     = document.createElement('span');
    labelName.innerHTML = name;
    carriage += labelName.outerHTML;
    carriage += value;
    return carriage;
  }
  const imgTagging = function(value){
    const img           = document.createElement('img');
    img.src             = value;
    img.style.height    = '38px';
    img.style.width     = '38px';
    img.draggable       = false;
    return img.outerHTML;
  }

  // Access Contorl: getter & setter ///////////////////////////////////////////

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    buildInnerDragItem(el){
      let text  = imgTagging(el.img);
          text += tagging('Job', el.name);
          text += tagging('Recovery', el.recovery);
          text += tagging('Speed', el.speed);
      return text;
    },
    onchange_dragZone(){
      if (0 >= this.arraySelectedGroup.length) goalZone.style.backgroundColor = 'white'; //'#e8e8e8';
      return true;
    },
    onchange_goalZone(){
      if (0 < this.arraySelectedGroup.length) goalZone.style.backgroundColor = 'white';
      return true;
    }
  }, Super.prototype);

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SelectSocialGPController
};
