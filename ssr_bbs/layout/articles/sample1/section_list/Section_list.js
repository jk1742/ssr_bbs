/* eslint-disable no-undef */
// import view block with controller
// import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';
// import { FRAME_SETTING  } from '/class/static/DefineConst';
import { Subject } from '/layout/components/panel/subject/Subject';
import { PanelNavBtns } from '/layout/components/panel/navBtns/PanelNavBtns';
import { SampleTable } from '/layout/articles/sample1/section_list/SampleTable'

const Section_list = function (id) {

  //* View Register
  const panelNavBtns = new PanelNavBtns('panelNavBtns');
  const sampleTable = new SampleTable(id + '-SampleTable');
  const subject = new Subject('subject');
  //* Describe Tags
  return $SR.generateHtml `
  <section id="${id}">
    <div class="cont_main">
      <!-- article Title -->
      <div class="frame-top">
        <div class="columns is-vcentered" style="height:100%;">
          <!-- Subject -->
          ${subject.outerHTML}
          <!-- EditTopBar -->
          ${panelNavBtns.outerHTML}
        </div>
      </div>
      <div class="frame-mid">
        <div class="container is-fluid">
          <div class = "columns is-centered">
              <div class = "column is-narrow">
                <!-- sample Table -->
                ${sampleTable.outerHTML}
              </div>
          </div>
        </div>
      </div>
      <div class="frame-btm">
        bottom
      </div>
    </div>
  </section>
  `; // HTML end
}
export {
  Section_list
};
