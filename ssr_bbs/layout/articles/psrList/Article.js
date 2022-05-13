/* eslint-disable no-undef */
//* import view block with controller /////////////////////////////////////////
import { ToolTip } from '/layout/components/toolTip/ToolTip';
import { Section_list } from '/layout/articles/psrList/section_list/Section_list';
import { Section_detail } from '/layout/articles/psrList/section_detail/Section_detail';


/**
 * ?data-scroll-lock = "true" scroll lock
 * ?data-icon =  "article selected icon"
 * @param {*} id
 * @returns
 */
const Article = function (id) {
  const toolTip = new ToolTip('toolTip');
  const section_list = new Section_list(id + '-Section_list');
  const section_detail = new Section_detail(id + '-Section_detail');

  return $SR.generateHtml `
  <article id="${id}" data-icon="fa-regular fa-rectangle-list" data-scroll-lock="true" alt="this is a alt contents of this sample page">
    <!-- ToolTip -->
    ${toolTip.outerHTML}
    <!-- Section_list -->
    ${section_list.outerHTML}
    <!-- Section_detail -->
    ${section_detail.outerHTML}
  </article>
  `; // HTML end
}
export {
  Article
};
