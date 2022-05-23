import './NavBar.css';

/***
 * block:  navigation tab
 * tab  if selected tab then put on the li tag to top-tab-activated
 ***/
// Describe constant Class below
const NavBar   = function(id, styles) {
  return $SR.generateHtml `
  <div class="column nav-bar-fixed nav-bar-animate" id="${id}" style="${styles}">
    <div class="columns" role="navigation" aria-label="main navigation">
      <div class="column is-narrow">
        <a class="button is-info is-inverted"><span class="icon is-medium"><i class="fa-regular fa-folder-open" aria-hidden="true"></i></span></a>
        <a class="button is-info is-inverted"><span class="icon is-medium"><i class="fa-solid fa-folder" aria-hidden="true"></i></span></a>
      </div>
      <div class="column">
        <div class="tabs is-centered">
          <ul>
          </ul>
        </div>
      </div>
    </div>
  </div>
  `; // HTML end
}
export {
  NavBar
};
