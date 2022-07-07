/* eslint-disable no-undef */
//* import view block with controller /////////////////////////////////////////
import { ToolTip } from '/layout/components/toolTip/ToolTip';
import { Section_list } from './sections/sortingList/Section_list';
import { Section_staticListEditor } from './sections/staticListEditor/Section_staticListEditor';
import { LocalCsvEditor } from './sections/localCsvEditor/LocalCsvEditor';


/**
 * ?data-scroll-lock = "true" scroll lock
 * ?data-icon =  "article selected icon"
 * @param {*} id
 * @returns
 */
const Article = function (id) {
  const toolTip = new ToolTip('toolTip');
  const section_list = new Section_list('psr-sorting-list');
  const section_staticListEditor = new Section_staticListEditor('static-list-editor');
  const section_localCsvEditor = new LocalCsvEditor('local-csv-editor');

  return $SR.generateHtml `
  <article data-id="${id}" data-icon="fa-solid fa-list-check" data-scroll-lock="true" alt="this is a alt contents of this sample page">
    <!-- ToolTip -->
    ${toolTip.outerHTML}
    <!-- Section_list -->
    ${section_list.outerHTML}
    <!-- section_staticListEditor -->
    ${section_staticListEditor.outerHTML}
    <!-- section_localCsvEditor -->
    ${section_localCsvEditor.outerHTML}
  </article>
  `; // HTML end
}
export {
  Article
}
