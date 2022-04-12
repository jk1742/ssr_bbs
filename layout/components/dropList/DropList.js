import '/layout/components/dropList/DropList.css';

/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const DropList   = function(id) {
  return $SR.generateHtml `
  <div class="dropdown-list"  id="${id}">
    <button class="dropdown-list-trigger">dropUp</button>
  </div>
  `; // HTML end
}
export {
  DropList
};
