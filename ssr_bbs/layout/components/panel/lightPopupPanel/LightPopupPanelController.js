import { Header } from "./Header";
import { ActionBlock } from "./ActionBlock";
import { NameBlock } from "./NameBlock";
import { Footer } from "./Footer";


const LightPopupPanelController = function (_filterBarHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const _private            = {};
  const iconBtn             = this.getModelByDataId('icon-btn');
  const popupPanel          = this.getModelByDataId('popup-panel');


  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    // articleId:{
    //   set:(str) => {_private.articleId = str},
    //   get:() => _private.articleId,
    //   enumerable:true
    // }
  });


  //* Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    appendHeader(name){
      popupPanel.append(new Header(name));
    },
    appendSimpleFilter(name, dataName, icon, space, inputIcon, placeholder) {
      const nameBlock = new NameBlock(icon, name, dataName);
      const _input = document.createElement('input');
      _input.setAttribute("type", "hidden");
      _input.setAttribute("name", dataName);
      nameBlock.append(_input)
      const actionBlock = new ActionBlock(name, dataName, space, inputIcon, placeholder);
      popupPanel.append($SR.registerModel(nameBlock));
      popupPanel.append($SR.registerModel(actionBlock));
      //
      actionBlock.classList.add('is-hidden');
      nameBlock.onclick = ()=>{
        actionBlock.classList.toggle('is-hidden');
      }
      const actionBlockSelect = actionBlock.getModelByDataId('action-block-select');
      const actionBlockCancel = actionBlock.getModelByDataId('action-block-cancel');
      const filterInput       = actionBlock.getModelByDataId('action-block-input');
      const labelTag          = nameBlock.getModelByDataId('label-block-tag');
      const storedValue       = nameBlock.querySelector(`input[name=${dataName}]`);
      // confirm
      actionBlockSelect.onclick = () => {
        if (filterInput.value != '') {
          actionBlock.classList.add('is-hidden');
          labelTag.innerHTML = filterInput.value;
          labelTag.className = "tag is-light";
          storedValue.value = filterInput.value;
        }
      }
      // deselect
      actionBlockCancel.onclick = () => {
        labelTag.innerHTML = '';
        labelTag.className = '';
        storedValue.value = '';
      }
    },
    appendFilter(dataName, _LabelBlock, _ActionBlock) {
      const nameBlock = _LabelBlock;
      nameBlock.setAttribute("data-name", dataName);
      const _input = document.createElement('input');
      _input.setAttribute("type", "hidden");
      _input.setAttribute("name", dataName);
      nameBlock.append(_input)
      const actionBlock = _ActionBlock;
      actionBlock.setAttribute("data-name", dataName);
      popupPanel.append($SR.registerModel(nameBlock));
      popupPanel.append($SR.registerModel(actionBlock));
      //
      actionBlock.classList.add('is-hidden');
      nameBlock.onclick = () => {
        actionBlock.classList.toggle('is-hidden');
      }
      const actionBlockSelect = actionBlock.getModelByDataId('action-block-select');
      const actionBlockCancel = actionBlock.getModelByDataId('action-block-cancel');
      const filterInput = actionBlock.getModelByDataId('action-block-input');
      const labelTag = nameBlock.getModelByDataId('label-block-tag');
      const storedValue = nameBlock.querySelector(`input[name=${dataName}]`);
      // confirm
      actionBlockSelect.onclick = () => {
        if (filterInput.value != '') {
          actionBlock.classList.add('is-hidden');
          labelTag.innerHTML = filterInput.value;
          labelTag.className = "tag is-light";
          storedValue.value = filterInput.value;
        }
      }
      // deselect
      actionBlockCancel.onclick = () => {
        labelTag.innerHTML = '';
        labelTag.className = '';
        storedValue.value = '';
      }
    },
    appendDataPanel(_dom) {
      popupPanel.append(_dom);
    },
    appendFooterConfirm(_confirm, _cancel) {
      const footer = new Footer();
      popupPanel.append(footer);
      const array = Array.from(this.getModelByDataClass('label-block'));
      if (typeof _confirm !== 'undefined' && _confirm.length > 0){
        footer.children[0].innerHTML = '';
        footer.children[0].append(document.createTextNode(_confirm));
      }
      if (typeof _cancel !== 'undefined' && _cancel.length > 0) {
        footer.children[1].innerHTML = '';
        footer.children[1].append(document.createTextNode(_cancel));
      }
      footer.children[0].onclick = (_e) =>{
        const carriage = {};
        array.forEach(element => {
          const value = _.trim(element.children[3].value);
          const name = element.getAttribute('data-name');
          carriage[name] = value;
        });
        // adapt filter
        me.adapt(_e, carriage);
      }
      footer.children[1].onclick = (_e) => {
        array.forEach(element => {
          element.children[2].innerHTML = '';
          element.children[2].className = '';
          element.children[3].value = '';
        });
        // reset filter
        me.resetConditions(_e);
      }
    },
    close: () => { popupPanel.classList.add('is-hidden') },
    adapt:(_e,_c) => null,
    resetConditions:(_e) => null
  });
  const me = this;


  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  iconBtn.onclick = (_e) => {
    popupPanel.classList.toggle('is-hidden');
  }


  //* inject controller ///////////////////////////////////////////////////////
  // sample
  // me.appendHeader('Filter');
  // me.appendFilter('HS Code', 'hsCode', 'fas fa-book', 'width:30%;');
  // me.appendFilter('FTA Code', 'ftaCode','fas fa-book', 'width:30%;');
  // me.appendFooter();
  // override @function adapt
  // override @function resetConditions


  //* Lazy Initialization /////////////////////////////////////////////////////


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  LightPopupPanelController
}
