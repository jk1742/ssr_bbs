/***
 * layout:  PanelNavBtns
 ***/
// Describe PanelNavBtns layout below
const PanelNavBtns   = function(id) {
  return $SR.generateHtml `
  <div class="column has-text-right" id="${id}">
    <a class="button is-primary is-inverted"><i class="fa-solid fa-circle-arrow-left"></i></a>
    <a class="button is-primary is-inverted"><i class="fa-solid fa-circle-arrow-down"></i></a>
    <a class="button is-primary is-inverted"><i class="fa-solid fa-circle-arrow-up"></i></a>
    <a class="button is-primary is-inverted"><i class="fa-solid fa-circle-arrow-right"></i></a>
    <a class="button is-primary is-inverted"><i class="fas fa-upload"></i></a>
    <a class="button is-primary is-inverted"><i class="fas fa-check"></i></a>
    <a class="button is-primary is-inverted"><i class="fas fa-exclamation-circle"></i><span class="badge"></span></a>
  </div>
  `; // HTML end
}
export {
  PanelNavBtns
};
