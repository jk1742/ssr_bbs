import '/layout/components/navBar/NavBar.css';

/***
 * block:  navigation tab
 * tab  if selected tab then put on the li tag to top-tab-activated
 ***/
// Describe constant Class below
const NavBar   = function(id, styles) {
  return $SR.generateHtml `
    <nav class="nav-bar" id="${id}" style="${styles}">
      <div class="nav-bar-frame">
        <div class="navBarFrame-listBox">
          <ul class="navBarFrame-list">
            <li class="top-menu" ><button class="menuBtn" alt="menu"><i class="fas fa-th"></i></button></li>
          </ul>
        </div>
      </div>
    </nav>
  `; // HTML end
}
export {
  NavBar
};
