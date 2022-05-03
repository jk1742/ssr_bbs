/* eslint-disable no-undef */
// import view block with controller
// import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';
// import { FRAME_SETTING  } from '/class/static/DefineConst';
import { CmdSysFormal } from '/layout/components/cmdSysFormal/CmdSysFormal';
import { PanelNavBtns } from '/layout/components/panel/navBtns/PanelNavBtns';
import { ActiveBar } from '/layout/components/panel/activeBar/ActiveBar';

const Section_detail = function (id) {

  //* View Register
  const cmdSysFormal = new CmdSysFormal(id+'-CmdSysFormal');
  const panelNavBtns = new PanelNavBtns('PanelNavBtns');
  const activeBar = new ActiveBar('ActiveBar');
  //* Describe Tags
  return $SR.generateHtml `
  <section id="${id}">
    <div class="cont_main">
      <!-- frame Top -->
      <div class="frame-top">
        <div class="columns is-vcentered" style="height:100%;">
          <div class= "column">
            <div class="content"></div>
          </div>
          <!-- top-right nav-bar -->
          ${panelNavBtns.outerHTML}
        </div>
      </div>
      <!-- frame mid -->
      <div class="frame-mid">
        <div class="container is-fluid">
          <div class = "columns is-centered">
            <div class = "column is-three-fifths">
              <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li><a href="#">Bulma</a></li>
                  <li><a href="#">Documentation</a></li>
                  <li><a href="#">Components</a></li>
                  <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
                </ul>
              </nav>
              <div class="control">
                <textarea class="textarea" placeholder="Normal textarea"  style="height:40vh;"></textarea>
              </div>
              <div class = "columns is-centered">
                <div class = "column"> hello world </div>
                <!-- Active Bar -->
                ${activeBar.outerHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="frame-btm">
        <h4 style="color:white;"> bottom section 2</h4>
      </div>
    </div>
  </section>
  `; // HTML end
}
export {
  Section_detail
};
