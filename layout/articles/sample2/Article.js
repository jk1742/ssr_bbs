/* eslint-disable no-undef */
// import view block with contorller
// import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';

// static <i class="far fa-axe"></i>
// import { FRAME_SETTING  } from '/class/static/DefineConst';
// <i class="fas fa-copyright"></i>
const Article = function (id) {
  return $SR.generateHtml `
  <article id="${id}" data-icon="fas fa-copyright" alt="this is a alt contents of this sample page">
    <section>
      <div class="cont_main">
        <!-- article Title -->
        <div class="frame-top">
          <h3> Brave a new World 2 </h3>
        </div>
        <div class="frame-mid">
          hello second world
        </div>
        <div class="frame-btm">
          bottom
        </div>
      </div>
    </section>
  </article>
  `; // HTML end
}
export {
  Article
};
