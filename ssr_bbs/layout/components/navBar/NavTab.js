/***
 * block:  speed control buttons
 * 1. set icon default
 ***/
// Describe constant Class below
const NavTab   = function(id, name, icon, styles, alt) {

  return $SR.generateHtml `
  <li id="${id}" style="${styles}">
    <button class="itemBtn" alt="${alt}"><i class="${icon}"></i> ${name} </button>
    <button class="closeBtn" alt="close this tab"><i class="fas fa-times"></i></button>
  </li>
  `; // HTML end
}
export {
  NavTab
};
