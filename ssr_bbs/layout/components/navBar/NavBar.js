import '/layout/components/navBar/NavBar.css';
import '/layout/components/commandList/CommandList.css';

/***
 * block:  navigation tab
 * tab  if selected tab then put on the li tag to top-tab-activated
 ***/
// Describe constant Class below
const NavBar   = function(id, styles) {
  return $SR.generateHtml `
    <div class="nav-bar" id="${id}" style="${styles}">
      <div class="nav-bar-frame">
        <div class="navBarFrame-listBox">
          <ul class="navBarFrame-list">
            <li class="top-menu" ><button class="menuBtn" alt="menu"><i class="fas fa-th"></i></button></li>
            <li class="top-tab-activated">
              <button class="itemBtn" alt="load1"><i class="fas fa-info"></i> tab 1 </button>
              <button class="closeBtn" alt="close"><i class="fas fa-times"></i></button>
            </li>
            <li>
              <button class="itemBtn" alt="load2"><i class="fas fa-info"></i> tab 2 </button>
              <button class="closeBtn" alt="close"><i class="fas fa-times"></i></button>
            </li>
            <li>
              <button class="itemBtn" alt="load3"><i class="fas fa-info"></i> tab 3 </button>
              <button class="closeBtn" alt="close"><i class="fas fa-times"></i></button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `; // HTML end
}
export {
  NavBar
};
