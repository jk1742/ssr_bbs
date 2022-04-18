/* eslint-disable no-undef */
// import view block with contorller
// import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';

// static <i class="far fa-axe"></i>
// import { FRAME_SETTING  } from '/class/static/DefineConst';
// <i class="fas fa-copyright"></i>
const Article = function (id) {
  return $SR.generateHtml `
  <article id="${id}" data-icon="fas fa-copyright" alt="this is a alt contents of this sample page">
    <!-- article Title -->
    <h3> Brave a new World 2</h3>
  </article>
  `; // HTML end
}
export {
  Article
};
