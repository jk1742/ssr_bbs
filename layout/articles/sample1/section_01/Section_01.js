/* eslint-disable no-undef */
// import view block with controller
// import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';
// import { FRAME_SETTING  } from '/class/static/DefineConst';
import { CmdSysFormal } from '/layout/components/cmdSysFormal/CmdSysFormal';

const Section_01 = function (id) {

  //* View Register
  const cmdSysFormal = new CmdSysFormal(id+'-CmdSysFormal');

  //* Describe Tags
  return $SR.generateHtml `
  <section id="${id}">
    <div class="cont_main">
      <!-- article Title -->
      <div class="frame-top">
        <div class="frame-top-left">
          <h3> Brave a new World 1 </h3>
        </div>
        <div class="frame-top-center">
        </div>
        <div class="frame-top-right">
          <!-- EditTopBar -->
          ${cmdSysFormal.outerHTML}
        </div>
      </div>
      <div class="frame-mid">
        hello world section 01 sample
      </div>
      <div class="frame-btm">
        bottom
      </div>
    </div>
  </section>
  `; // HTML end
}
export {
  Section_01
};
