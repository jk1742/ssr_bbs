import { Header } from "./Header";
import { ActionBlock } from "./ActionBlock";
import { NameBlock } from "./NameBlock";
import { Footer } from "./Footer";


const FilterBarController = function (_filterBarHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const _private              = {};
  const searchBtn             = this.getModelById('search-btn');
  const searchPanel           = this.getModelById('search-panel');


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
      searchPanel.append(new Header(name));
    },
    appendFilter(name, dataName, icon, space) {
      const nameBlock = new NameBlock(icon, name, dataName);
      const actionBlock = new ActionBlock(name,space);
      actionBlock.classList.add('is-hidden');
      nameBlock.onclick = ()=>{
        actionBlock.classList.toggle('is-hidden');
      }
      // confirm
      actionBlock.children[2].onclick = () => {
        if (actionBlock.children[1].firstChild.value != '') {
          actionBlock.classList.add('is-hidden');
          nameBlock.children[2].innerHTML = actionBlock.children[1].firstChild.value;
          nameBlock.children[2].className = "tag is-light";
          nameBlock.children[3].value = actionBlock.children[1].firstChild.value;
        }
      }
      // deselect
      actionBlock.children[3].onclick = () => {
        nameBlock.children[2].innerHTML = '';
        nameBlock.children[2].className = '';
        nameBlock.children[3].value = '';
      }
      searchPanel.append(nameBlock);
      searchPanel.append(actionBlock);
    },
    appendFooter() {
      const footer = new Footer();
      searchPanel.append(footer);
      const array = Array.from(this.getModelByDataClass('filter-name-block'));
      footer.children[0].onclick = (_e) =>{
        const carriage = {};
        array.forEach(element => {
          const value = _.trim(element.children[3].value);
          const name = element.getAttribute('data-name');
          carriage[name] = value;
        });
        // adapt filter
        me.adaptFilter(_e, carriage);
      }
      footer.children[1].onclick = (_e) => {
        array.forEach(element => {
          element.children[2].innerHTML = '';
          element.children[2].className = '';
          element.children[3].value = '';
        });
        // reset filter
        me.resetFilter(_e);
      }
    },
    close: () => { searchPanel.classList.add('is-hidden') },
    adaptFilter:(_e,_c) => null,
    resetFilter:(_e) => null
  });
  const me = this;


  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  searchBtn.onclick = (_e) => {
    searchPanel.classList.toggle('is-hidden');
  }


  //* inject controller ///////////////////////////////////////////////////////
  // sample
  // me.appendHeader('Filter');
  // me.appendFilter('HS Code', 'hsCode', 'fas fa-book', 'width:30%;');
  // me.appendFilter('FTA Code', 'ftaCode','fas fa-book', 'width:30%;');
  // me.appendFooter();
  // override @function adaptFilter
  // override @function resetFilter


  //* Lazy Initialization /////////////////////////////////////////////////////


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  FilterBarController
}
