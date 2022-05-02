/* eslint-disable no-undef */
//* import view block /////////////////////////////////////////////////////////
import { Section_list     } from '/layout/articles/sample1/section_list/Section_list';
import { Section_02       } from '/layout/articles/sample1/section_02/Section_02';
import { ToolTip          } from '/layout/components/toolTip/ToolTip';
// import { FRAME_SETTING  } from '/class/static/DefineConst';

const Article = function (id) {

  //* view component //////////////////////////////////////////////////////////
  const section_list = new Section_list(id + '-Section_list');
  const section_02 = new Section_02(id + '-Section_02');
  const toolTip = new ToolTip('toolTip');

  //* HTML template ///////////////////////////////////////////////////////////
  return $SR.generateHtml `
  <article id="${id}" data-icon="fas fa-copyright" alt="this is a alt contents of this sample page">
    <!-- ToolTip -->
    ${toolTip.outerHTML}
    <!-- Section_01 -->
    ${section_list.outerHTML}
    <!-- Section_02 -->
    ${section_02.outerHTML}
  </article>
  `; // HTML end
}
export {
  Article
};
