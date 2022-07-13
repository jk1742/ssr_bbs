/* eslint-disable no-undef */
// import view block with controller

const LocalCsvEditor = function (id) {

  //* View Register

  //* Describe Tags
  return $SR.generateHtml `
  <section data-id="${id}">
    <div class="cont_main">
      <div class="frame-top">
        <div class="columns is-vcentered" style="height:100%;">
          <div class= "column">
            <div class="content"><h3 class="article-subject"> Local Csv Editor </h3></div>
          </div>
          <div class= "column" style="padding-right:5vw;">
            <div class="is-pulled-right">
              <a class="button is-primary is-inverted" data-id="btn-local-csv" style="float:left;">
                  <i class="fa-solid fa-table-cells"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="frame-mid">
        <div class="container is-fluid">
          <div class = "columns is-centered">
              <div class = "column is-narrow">
                sample Table
              </div>
          </div>
        </div>
      </div>
      <div class="frame-btm">
      </div>
    </div>
  </section>
  `; // HTML end
}
export {
  LocalCsvEditor
}
