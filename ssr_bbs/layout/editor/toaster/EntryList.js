import { ToggleSwitch }  from '/layout/components/toggleSwitch/ToggleSwitch';
/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const EntryList   = function(id) {
  const toggleSwitch  = new ToggleSwitch('Toaster-EntryList-Isolated');
  return $SR.generateHtml `
  <div id="${id}">
    <table class="entry-table">
      <tr>
        <th>Section</th>
        <td><input type="text"></td>
        <th>Isolated</th>
        <td>
          <!-- toggleSwitch -->
          ${toggleSwitch.outerHTML}
        </td>
      </tr>
      <tr><th>Radius</th><td><input type="text"></td><th>Age</th><td><input type="text"></td></tr>
    </table>
  </div>
  `; // HTML end
}
export {
  EntryList
};
