/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const EntryList   = function(id) {
  return $SR.generateHtml `
  <div id="${id}">
    <table class="entry-table">
      <tbody>
        <tr>
          <th>Info</th>
          <td colspan="3"><span style="font-size: 1.3vh;"></span></td>
        </tr>
        <tr><th>Radius</th><td><input type="text"></td><th>Stage Health</th><td><input type="text"></td></tr>
      </tbody>
    </table>
  </div>
  `; // HTML end
}
export {
  EntryList
};
