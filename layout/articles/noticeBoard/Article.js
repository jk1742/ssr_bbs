/* eslint-disable no-undef */
//* import view block with controller
import { Section_list } from '/layout/articles/noticeBoard/section_list/Section_list';
import { Section_02     } from '/layout/articles/sample1/section_02/Section_02';
// import { FRAME_SETTING  } from '/class/static/DefineConst';

const Article = function (id) {
  const section_list = new Section_list(id + '-Section_list');
  const section_02 = new Section_02(id + '-Section_02');

  return $SR.generateHtml `
  <article id="${id}" data-icon="fa-solid fa-radio" alt="this is a alt contents of this sample page">
    <!-- Section_01 -->
    ${section_list.outerHTML}
  </article>
  `; // HTML end
}
export {
  Article
};
