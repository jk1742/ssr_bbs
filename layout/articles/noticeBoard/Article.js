/* eslint-disable no-undef */
//* import view block with controller
import { Section_list } from '/layout/articles/noticeBoard/section_list/Section_list';
import { Section_02     } from '/layout/articles/sample1/section_02/Section_02';


/**
 * ?data-scroll-lock = "true" scroll lock
 * ?data-icon =  "article selected icon"
 * @param {*} id
 * @returns
 */
const Article = function (id) {
  const section_list = new Section_list(id + '-Section_list');
  const section_02 = new Section_02(id + '-Section_02');

  return $SR.generateHtml `
  <article id="${id}" data-icon="fa-solid fa-radio" data-scroll-lock="true" alt="this is a alt contents of this sample page">
    <!-- Section_01 -->
    ${section_list.outerHTML}
  </article>
  `; // HTML end
}
export {
  Article
};
