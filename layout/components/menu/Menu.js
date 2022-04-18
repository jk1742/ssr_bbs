import '/layout/components/menu/Menu.css';

/***
 * block:  menu
 ***/
// Describe constant Class below
const Menu = function (id, styles) {
  return $SR.generateHtml `
    <div class="menu-top" id="${id}" style="${styles}">
      <a href="javascript:void(0)" class="closebtn">&times;</a>
    </div>
  `; // HTML end
}
export {
  Menu
};
