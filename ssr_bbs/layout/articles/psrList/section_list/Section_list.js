/* eslint-disable no-undef */
// import view block with controller
import { FilterBar } from '/layout/components/panel/filterBar/FilterBar';
import { SortingTable } from '/layout/components/tables/sortingTable/SortingTable';

const Section_list = function (id) {

  //* View Register
  const table = new SortingTable(id+'-SortingTable','67vh','width:80vw');
  const searchBar = new FilterBar('SearchBar', 'fa-solid fa-magnifying-glass', 'float: left;', 'right:7vw;width:30vw;background-color:white;z-index:15;');

  //* Describe Tags
  return $SR.generateHtml `
  <section id="${id}">
    <div class="cont_main">
      <!-- article Title -->
      <div class="frame-top">
        <div class="columns is-vcentered" style="height:100%;">
          <div class= "column">
            <div class="content"><h3 class="article-subject"> PSR List </h3></div>
          </div>
          <div class= "column" style="padding-right:5vw;">
            <div class="is-pulled-right">
              <!-- searchBar -->
              ${searchBar.outerHTML}
              <a class="button is-primary is-inverted" data-id="btn-select-cancel" style="float:left;">
                  <i class="fa-solid fa-arrow-rotate-left"></i>
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
