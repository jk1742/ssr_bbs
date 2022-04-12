/***
 * Layout:  SelectGroupController
 ***/

// Describe EntryList Class below
const SelectGroupController = function (selectGroupHandler) {

  // private variable //////////////////////////////////////////////////////////
  //

  // mapping ///////////////////////////////////////////////////////////////////
  const goalZone            = this.firstChild.lastChild.firstChild;
  const dragZone            = this.firstChild.lastChild.lastChild;
  const label               = this.firstChild.firstChild.firstChild;
  const currentId           = this.id;
  let   arraySelectedGroup  = [];
  let   arrayWholeGroup     = [];

  // Privilige Static Functions ////////////////////////////////////////////////
  const groupClear = function(){
    goalZone.innerHTML = '';
    dragZone.innerHTML = '';
  }
  const buildDragItem = function(el, html){
    const item                     = document.createElement('div');
    item.classList.add('drag-dropdown-item');
    item.id                        = currentId + 'DragItem_' + el.name;
    item.setAttribute('data-parent-id', currentId);
    //item.style.backgroundImage     = 'url(' + el.img + ')';
    item.innerHTML                 = html;
    item.draggable                 = true;
    item.ondragstart = function(ev){
      ev.dataTransfer.setData("text", ev.target.id);
    }
    return item;
  }

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    arraySelectedGroup: {
      get: function() {
        return _.cloneDeep(arraySelectedGroup);
      }
    },
    label:{
      get: function() {
        return label.innerHTML;
      },
      set: function(o){
        label.innerHTML = o;
      }
    }
  });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    draw () {
      groupClear();
      arraySelectedGroup.forEach((el, i) => {
        const html  = this.buildInnerDragItem(el);
        goalZone.appendChild(buildDragItem(el, html));
      });
      arrayWholeGroup.forEach((el, i) => {
        const html  = this.buildInnerDragItem(el);
        dragZone.appendChild(buildDragItem(el, html));
      });
    },
    bindGroup (arrayWh, array) {
      if('undefined' == typeof array || array.length <= 0) {
        arraySelectedGroup  = [];
        arrayWholeGroup = arrayWh;
      } else {
        arraySelectedGroup = array;
        arrayWholeGroup = arrayWh.filter((el)=>{
          return !(0 <= array.findIndex(e => e.name == el.name));
        });
      }
      this.draw();
    },
    bindGroupClear(){
      arraySelectedGroup  = [];
      arrayWholeGroup     = [];
      groupClear();
    },
    buildInnerDragItem(el){
      return '';
    },
    onchange_dragZone(e){
      //console.log('onchange_dragZone',this.arraySelectedGroup);
      return true;
    },
    onchange_goalZone(e){
      //console.log('onchange_goalZone',this.arraySelectedGroup);
      return true;
    }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  const me = this;

  // Event handler /////////////////////////////////////////////////////////////
  goalZone.ondrop = function(e) {
    e.preventDefault();
    let dom = e.target;
    // target attaching node check
    if(dom.className != 'drag-dropdown-zone' && dom.closest('.drag-dropdown-zone')){
      dom = dom.closest('.drag-dropdown-zone');
    }
    if(dom.className != 'drag-dropdown-zone' ) return;
    // when node safe, check id
    const data  = e.dataTransfer.getData("text");
    const item  = document.getElementById(data);
    if(currentId !== item.getAttribute('data-parent-id')) return;
    // append node and adjust array
    dom.appendChild(item);
    const name  = data.split('DragItem_')[1];
    const i     = arrayWholeGroup.findIndex(e => e.name == name);
    arraySelectedGroup.push(arrayWholeGroup[i]);
    arrayWholeGroup.splice(i, 1);
    // change event
    me.onchange_goalZone();
  }
  goalZone.ondragover = function(e) {
    e.preventDefault();
  }
  dragZone.ondrop = function(e) {
    e.preventDefault();
    let dom = e.target;
    // target attaching node check
    if(dom.className != 'drag-dropdown-zone' && dom.closest('.drag-dropdown-zone')){
      dom = dom.closest('.drag-dropdown-zone');
    }
    if(dom.className != 'drag-dropdown-zone' ) return;
    // when node safe, check id
    const data  = e.dataTransfer.getData("text");
    const item  = document.getElementById(data);
    if(currentId !== item.getAttribute('data-parent-id')) return;
    // append node and adjust array
    dom.appendChild(item);
    const name  = data.split(currentId + 'DragItem_')[1];
    const i     = arraySelectedGroup.findIndex(e => e.name == name);
    arrayWholeGroup.push(arraySelectedGroup[i]);
    arraySelectedGroup.splice(i, 1);
    // change event
    me.onchange_dragZone();
  }
  dragZone.ondragover = function(e) {
    e.preventDefault();
  }

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SelectGroupController
};
