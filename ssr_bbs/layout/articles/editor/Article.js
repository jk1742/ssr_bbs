/* eslint-disable no-undef */
//* import view block with controller /////////////////////////////////////////
import { ToolTip } from '/layout/components/toolTip/ToolTip';
import { Section_list } from './section_list/Section_list';
import { Section_listEditor } from './section_listEditor/Section_listEditor';


/**
 * ?data-scroll-lock = "true" scroll lock
 * ?data-icon =  "article selected icon"
 * @param {*} id
 * @returns
 */
const Article = function (id) {
  const toolTip = new ToolTip('toolTip');
  const section_list = new Section_list(id + '-Section_list');
  const section_listEditor = new Section_listEditor(id + '-Section_listEditor');// utility fix

  return $SR.generateHtml `
  <article id="${id}" data-icon="fa-solid fa-list-check" data-scroll-lock="true" alt="this is a alt contents of this sample page">
    <!-- ToolTip -->
    ${toolTip.outerHTML}
    <!-- Section_list -->
    ${section_list.outerHTML}
    <!-- section_listEditor -->
    ${section_listEditor.outerHTML}
  </article>
  `; // HTML end
}
export {
  Article
};
