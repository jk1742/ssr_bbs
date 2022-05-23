/***
 * block:  menu
 ***/
// Describe constant Class below
const MenuItem = function (name) {
  return $SR.generateHtml `
  <li>
    <a href="#"> ${name} </a>
  </li>
  `; // HTML end
}
export {
  MenuItem
};
