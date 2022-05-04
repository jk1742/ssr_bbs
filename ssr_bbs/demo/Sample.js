/***
 * block:  menu
 ***/
// Describe constant Class below
const Menu = function (id, styles) {
  return $SR.generateHtml `
    <div class="menu" id="${id}" style="${styles}">
      hello world this is menu
    </div>
  `; // HTML end
}
export {
  Menu
};
