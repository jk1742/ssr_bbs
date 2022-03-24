/***
 * Layout:  SelectGroup
 ***/
// Describe SelectGroup Class below
const SelectGroup   = function (id) {
  return $SR.generateHtml `
  <div id="${id}" class="select-group">
    <div>
      <div><span>Group</span></div>
      <div class="drag-ctrl-handle">
        <div class="drag-dropdown-zone"></div>
        <div class="drag-dropdown-zone"></div>
      </div>
    </div>
  </div>
  `; // HTML end
}
export {
  SelectGroup
};
