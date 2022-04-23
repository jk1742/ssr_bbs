/* eslint-disable no-undef */
//* import view block with controller
import { Section_01     } from '/layout/articles/sample1/section_01/Section_01';
import { Section_02     } from '/layout/articles/sample1/section_02/Section_02';
// import { FRAME_SETTING  } from '/class/static/DefineConst';

const Article = function (id) {
  const section_01 = new Section_01(id + '-Section_01');
  const section_02 = new Section_02(id + '-Section_02');

  return $SR.generateHtml `
  <article id="${id}" data-icon="fas fa-copyright" alt="this is a alt contents of this sample page">
    <!-- Section_01 -->
    ${section_01.outerHTML}
    <!-- Section_02 -->
    ${section_02.outerHTML}
  </article>
  `; // HTML end
}
export {
  Article
};
