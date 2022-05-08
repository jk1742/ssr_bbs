/* eslint-disable no-undef */
// import view block with controller
// import { FRAME_SETTING  } from '/class/static/DefineConst';
import { DynamicBox as PanelNavBtns } from '/layout/components/panel/dynamicBox/DynamicBox';
import { SortingTable } from '/layout/components/tables/sortingTable/SortingTable';
// import { SampleTable } from '/layout/articles/noticeBoard/section_list/SampleTable';


const Section_list = function (id) {

  //* View Register
  const panelNavBtns = new PanelNavBtns('panelNavBtns');
  const table = new SortingTable(id+'-SortingTable','67vh','width:80vw');

  //* Describe Tags
  return $SR.generateHtml `
  <section id="${id}">
    <div class="cont_main">
      <!-- article Title -->
      <div class="frame-top">
        <div class="columns is-vcentered" style="height:100%;">
          <div class= "column">
            <div class="content"><h3 class="article-subject"> Notice Board </h3></div>
          </div>
          <!-- top-right nav-bar -->
          ${panelNavBtns.outerHTML}
        </div>
      </div>
      <div class="frame-mid">
        <div class="container is-fluid">
          <div class = "columns is-centered">
              <div class = "column is-narrow">
                <!-- sample Table -->
                ${table.outerHTML}
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
