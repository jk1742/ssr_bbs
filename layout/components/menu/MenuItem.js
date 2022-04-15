/***
 * block:  menu
 ***/
// Describe constant Class below
const MenuItem = function (name) {
  return $SR.generateHtml `
    <a href="#"> ${name} </a>
  `; // HTML end
}
export {
  MenuItem
};
