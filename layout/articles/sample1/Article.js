/* eslint-disable no-undef */
// import view block with contorller
// import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';

// import { FRAME_SETTING  } from '/class/static/DefineConst';
const Article = function (id) {
  return $SR.generateHtml `
  <article id="${id}" data-icon="fas fa-copyright" alt="this is a alt contents of this sample page">
    <section>
      <div class="cont_main">
        <!-- article Title -->
        <div class="frame-top">
          <h3> Brave a new World 1 </h3>
        </div>
        <div class="frame-mid">
          hello world
        </div>
        <div class="frame-btm">
        </div>
      </div>
    </section>
  </article>
  `; // HTML end
}
export {
  Article
};
