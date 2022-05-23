/***
 * block:  speed control buttons
 * 1. set icon default
 ***/
// Describe constant Class below
const NavTab   = function(id, name, icon, alt, styles) {

  return $SR.generateHtml `
  <li id="${id}" style="${styles}">
    <a class="itemBtn" alt="${alt}">
      <span class="icon is-small"> <i class="${icon}" aria-hidden="true"></i></span>
      <span>${name}</span>
      <button class="delete" style="margin-left:12px;"></button>
    </a>
  </li>
  `; // HTML end
}
export {
  NavTab
};
