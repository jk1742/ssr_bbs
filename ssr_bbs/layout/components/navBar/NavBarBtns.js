import '/layout/components/commandList/CommandList.css';

/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const NavBarBtns   = function(id, styles) {

  return $SR.generateHtml `
  <div class="command-list"  id="${id}" style="${styles}">
    <ul class="command-list-contents">
      <li><button><i class="fas fa-th"></i></button></li>
      <li><button><i class="fas fa-binoculars"></i></button></li>
    </ul>
  </div>
  `; // HTML end
}
export {
  NavBarBtns
};
