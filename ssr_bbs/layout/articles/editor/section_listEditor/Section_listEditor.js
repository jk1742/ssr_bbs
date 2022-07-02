/* eslint-disable no-undef */
// import view block with controller
import { ListEditor } from "/layout/components/tables/listEditor/ListEditor";

const Section_listEditor = function (id) {

  //* View Register
  const table = new ListEditor('list-editor','67vh','width:80vw');

  //* Describe Tags
  return $SR.generateHtml `
  <section id="${id}">
    <div class="cont_main">
      <!-- article Title -->
      <div class="frame-top">
        <div class="columns is-vcentered" style="height:100%;">
          <div class= "column">
            <div class="content"><h3 class="article-subject"> List Editor </h3></div>
          </div>
          <div class= "column" style="padding-right:5vw;">
            <div class="is-pulled-right">
              <a class="button is-primary is-inverted" data-id="btn-get-data" style="float:left;">
                  <i class="fa-solid fa-info"></i>
              </a>
              <a class="button is-primary is-inverted" data-id="btn-back-list" style="float:left;">
                  <i class="fa-solid fa-arrow-rotate-left"></i>
              </a>
              <a class="button is-primary is-inverted" data-id="btn-copy-selected" style="float:left;">
                <i class="fa-regular fa-copy"></i>
              </a>
              <a class="button is-primary is-inverted" data-id="btn-csv-demo" style="float:left;">
                <i class="fa-solid fa-file-csv"></i>
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
                <input id="csv" type="file">
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
  Section_listEditor
}
