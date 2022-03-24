import { MessageElement           } from '/layout/components/messageBox/MessageElement';
import { MessageElementController } from '/layout/components/messageBox/MessageElementController';
/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const MessageBoxController   = function (messageBoxHandler) {

  // private variable //////////////////////////////////////////////////////////

  // mapping ///////////////////////////////////////////////////////////////////
  let template          = this;
  let arrayItems        = [];

  // Privilige Static Functions ////////////////////////////////////////////////
  const deleteDom = function(id){
    const selectedDom = document.getElementById(id);
    //delay
    template.removeChild(selectedDom);
    //setTimeout(function(){ template.removeChild(selectedDom); }, 600);
  }
  const attachEvent = function(item){
    arrayItems.push(item);
    if('undefined' !== typeof messageBoxHandler.onchange_msgStack) messageBoxHandler.onchange_msgStack(arrayItems);
    template.appendChild(new MessageElement(item.id, item.subject, item.msg, item.type));
    $SR.View(item.id).inject(MessageElementController, {
      onclick_close(e, id){
        deleteDom(id);
        arrayItems.splice(arrayItems.findIndex(e => e.id === id),1);
        if('undefined' !== typeof messageBoxHandler.onchange_msgStack) messageBoxHandler.onchange_msgStack(arrayItems);
      }
    });
  }

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    stackSize: {
      get: function() {
        return arrayItems.length;
      },
      enumerable:true
    },
    lastMsgType: {
      get: function() {
        const c = (0 >= arrayItems.length)? 'none': arrayItems[arrayItems.length -1].type;
        return c;
      },
      enumerable:true
    },
    visibility: {
      get:() => (template.style.display === 'block'),
      enumerable:true
    }
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    turnOnMsgbox (e, o) {
      if('undefined' !== typeof messageBoxHandler.turnOnMsgbox) messageBoxHandler.turnOnMsgbox();
      template.style.display = 'block';
      template.style.position = 'absolute';
      template.style.top = o.top + window.pageYOffset;
      template.style.left = o.left + window.pageXOffset;
      template.style.width = o.width;
      template.style.height = o.height+2;
    },
    turnOffMsgbox () {
      if('undefined' !== typeof messageBoxHandler.turnOffMsgbox) messageBoxHandler.turnOffMsgbox();
      template.style.display = 'none';
    },
    toggle_msgbox (e, o) {
      if ('none'=== template.style.display) this.turnOnMsgbox(e, o);
      else this.turnOffMsgbox();
    },
    addSuccess(msg){
      let item = {
        id      : template.id + '-me-' + $SR.uuidv4(),
        type    : 'success',
        subject : 'Success',
        msg     : msg
      };
      attachEvent(item);
    },
    addInfo(msg){
      let item = {
        id      : template.id + '-me-' + $SR.uuidv4(),
        type    : 'info',
        subject : 'Information',
        msg     : msg
      };
      attachEvent(item);
    },
    addWarning(msg){
      let item = {
        id      : template.id + '-me-' + $SR.uuidv4(),
        type    : 'warning',
        subject : 'Warning',
        msg     : msg
      };
      attachEvent(item);
    },
    addAlert(msg){
      let item = {
        id      : template.id + '-me-' + $SR.uuidv4(),
        type    : 'alert',
        subject : 'Alert',
        msg     : msg
      };
      attachEvent(item);
    },
  });

  // Event handler /////////////////////////////////////////////////////////////

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  MessageBoxController
};
