// import library & font & icons & css
import _ from 'lodash';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '/static/css/style.css';

// import
import { Logger } from '/class/Logger';

// import view block with contorller
import { Header } from '/layout/header/Header';
import { Section } from '/layout/section/Section';
import { SectionController } from '/layout/section/SectionController';
import { EditSectionController } from '/layout/edit/EditSectionController';
import { EditSection } from '/layout/edit/EditSection';
import { initiate } from '/static/js/initiate';
// set logger //////////////////////////////////////////////////////////////////
let logger = new Logger();
logger.status = true;
// variable dom //////////////////////////////////////////////////////////////
let header            = new Header();
let sectionComponent  = new Section();
let editComponent     = new EditSection();
// appending /////////////////////////////////////////////////////////////////
document.body.appendChild(header);
document.body.appendChild(sectionComponent);
document.body.appendChild(editComponent);

window.onload = function(){
  // controller ////////////////////////////////////////////////////////////////
  sectionComponent      = new SectionController( sectionComponent, {
    onclick_btnEdit(e,c){
      editComponent.switchInfoTable = true;
      const y = editComponent.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: 'smooth'
      });
      if ('undefined' == typeof c) {
        editComponent.bindInfoTableBlank();
        return;
      }
      editComponent.bindInfoTable(c);
    },
    onTic_canvas(e){
      if(!editComponent.switchInfoTable) return;
      let carriage = e.find( i => (i.attribute.onFocus));
      if ('undefined' == typeof carriage) {
        editComponent.bindInfoTableBlank();
        return;
      }
      editComponent.bindInfoTable(carriage);
    },
    on_InfoTable (){
      editComponent.switchInfoTable = true;
    },
    off_InfoTable (){
      editComponent.bindInfoTableBlank();
    }

  });
  editComponent         = new EditSectionController(editComponent,{
    dom_onload(){
      logger.stepLog(0,'index_Dom_onLoad');
    }
  });

  // initiate //////////////////////////////////////////////////////////////////
  initiate();
}
////////////////////////////////////////////////////////////////////////////////
