/* eslint-disable no-undef */
// import view block with controller
import { FileInput         } from '/layout/components/form/file/FileInput';
import { SortingTable } from '/layout/components/tables/sortingTable/SortingTable';

const Section_list = function (id) {

  //* View Register
  const table = new SortingTable('sorting-table', '67vh', 'width:80vw');
  const file = new FileInput('is-small is-info').setIcon('fa-solid fa-bolt').setLabel('파일을 선택하세용').setName('test');

  //* Describe Tags
  return $SR.generateHtml `
  <section data-id="${id}">
    <div class="cont_main">
      <!-- article Title -->
      <div class="frame-top">
        <div class="columns is-vcentered" style="height:100%;">
          <div class= "column">
            <div class="content"><h3 class="article-subject"> List Editor </h3></div>
          </div>
          <div class= "column" style="padding-right:5vw;">
            <div class="is-pulled-right">
              <a class="button is-primary is-inverted" data-id="btn-line-editor" style="float:left;">
                  <i class="fa-solid fa-check-to-slot"></i>
              </a>
              <a class="button is-primary is-inverted" data-id="btn-select-cancel" style="float:left;">
                  <i class="fa-solid fa-ban"></i>
              </a>
            </div>
          </div>
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
          <div class = "columns is-centered">
              <div class = "column is-narrow">
                <!-- file -->
                ${file.outerHTML}
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
