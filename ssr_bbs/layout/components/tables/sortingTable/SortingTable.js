/* eslint-disable no-undef */
import '/layout/components/tables/sortingTable/SortingTable.css';
import { SliderDot } from './index/SliderDot';

/***
 * block:  SortingTable
 ***/
// Describe Layout below
const SortingTable = function(id, height, styles) {

  //* View Register
  const sliderDot = new SliderDot('sliderDot');

  return $SR.generateHtml `
  <div data-id ="${id}" style="height:${height};${styles};" class='sorting-table'>
    <div class="table-container is-size-7 sorting-table-container" >
      <table class="table is-striped is-hoverable">
        <thead id ="${id + '-Header'}"></thead>
        <tbody id ="${id + '-Body'}" style="overflow-y: auto;"></tbody>
      </table>
    </div>
    <div class="sorting-table-recordLine" id="indexRecord">
      <div class="sorting-table-recordLine-bar" style="height:calc(${height} - 29px); margin-top:29px;">
      </div>
      <!-- sliderBar -->
      ${sliderDot.outerHTML}
    </div>
  </div>
  `; // HTML end
};//SortingTable()
export {
  SortingTable
};
