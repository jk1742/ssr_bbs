import BtnEdit from '/static/img/portrait/avatar_01.svg';
/***
 * block:  focusView
 ***/
// Describe Layout below
const FocusBridge   = function(id) {
  return $SR.generateHtml `
  <div class="tag-card" id ="${id}">
    <img src="${BtnEdit}">
    <div>
      <h4>Unselected</h4><span>select single item</span>
    </div>
    <div class="action-box">
      <button><i class="far fa-edit"></i></button>
    </div>
  </div>

  `; // HTML end
}
export {
  FocusBridge
};
