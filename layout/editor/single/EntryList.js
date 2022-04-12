import { ToggleSwitch }  from '/layout/components/toggleSwitch/ToggleSwitch';

/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const EntryList   = function(id) {
  const toggleSwitch  = new ToggleSwitch('FocusEditor-EntryList-Isolated');
  return $SR.generateHtml `
  <div id="${id}">
    <table class="entry-table">
      <tbody>
        <tr>
          <th>ID</th>
          <td colspan="3"><span style="font-size: 1.3vh;"></span></td>
        </tr>
        <tr>
          <th>Radius</th>
          <td><input type="text"></td>
          <th>Isolated</th>
          <td>
            <!-- toggleSwitch -->
            ${toggleSwitch.outerHTML}
          </td>
        </tr>
        <tr>
          <th>Stage Health</th>
          <td><input type="text"></td>
          <th>color</th>
          <td><i class="fas fa-ambulance"></i></td>
        </tr>
        <tr>
          <th>R numbers</th>
          <td><input type="text"></td>
          <th>Vaccine</th>
          <td><input type="text"></td>
        </tr>
      </tbody>
    </table>
  </div>
  `; // HTML end
}
export {
  EntryList
};
