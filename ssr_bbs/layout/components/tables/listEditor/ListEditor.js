/* eslint-disable no-undef */
import './ListEditor.css';

/***
 * block:  SortingTable
 ***/
// Describe Layout below
const ListEditor = function(id, height, styles) {

  //* View Register
  // const sliderDot = new SliderDot('sliderDot');

  return $SR.generateHtml `
  <div data-id ="${id}" style="height:${height};${styles}; overflow-y: auto;" class="table-container is-size-7 list-Editor" >
    <table class="table is-bordered is-hoverable">
      <thead id ="${id + '-Header'}"></thead>
      <tbody id ="${id + '-Body'}" style="overflow-y: auto;"></tbody>
    </table>
  </div>
  `; // HTML end
};//SortingTable()
export {
  ListEditor
};
