import '/layout/components/navBar/NavBar.css';
import '/layout/components/commandList/CommandList.css';

/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const NavBar   = function(id, styles) {
  return $SR.generateHtml `
    <div class="nav-bar" id="${id}" style="${styles}">
      <div class="nav-bar-left">
        <div class="command-list">
          <ul class="command-list-contents">
            <li><button alt="menu"><i class="fas fa-th"></i></button></li>
            <li><button alt="load"><i class="fas fa-fan"></i></button></li>
          </ul>
        </div>
      </div>
      <div class="nav-bar-center">
        <div class="command-list">
        <ul class="command-list-contents">
          <li><button alt="menu"><i class="fas fa-tachometer-alt"></i></button></li>
          <li><button alt="load"><i class="fas fa-tachometer-alt"></i></button></li>
        </ul>
      </div>
      </div>
      <div class="nav-bar-right">
        3
      </div>
    </div>
  `; // HTML end
}
export {
  NavBar
};
