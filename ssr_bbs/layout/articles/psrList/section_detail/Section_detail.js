/* eslint-disable no-undef */
//* import view block /////////////////////////////////////////////////////////
import { PanelNavBtns               } from '/layout/components/panel/navBtns/PanelNavBtns';
import { DynamicBox as BoardCtrlBox } from '/layout/components/panel/dynamicBox/DynamicBox';
import { DatePicker             } from '/layout/components/datePicker/defaultDatePicker/DatePicker';

const Section_detail = function (id) {

  //* View Register ///////////////////////////////////////////////////////////
  const panelNavBtns  = new PanelNavBtns('PanelNavBtns');
  const boardCtrlBox  = new BoardCtrlBox('BoardCtrlBox');
  const datePicker = new DatePicker('SampleCalendar','style','range');

  //* Describe Tags ///////////////////////////////////////////////////////////
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
              <div class = "columns">
                <div class = "column">
                  ${datePicker.outerHTML}
                </div>
                <div class = "column">
                </div>
                <div class = "column">
                </div>
              </div>
            </div>
          </div>
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
            </div>
          </div>
          <div class = "columns is-centered">
            <div class = "column is-three-fifths">
              <div class = "columns">
                <div class = "column">
                </div>
                <!-- Board control button box -->
                ${boardCtrlBox.outerHTML}
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
