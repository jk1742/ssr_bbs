import bracket_open   from '/static/img/support/bracket_open.svg';
import bracket_close  from '/static/img/support/bracket_close.svg';

/***
 * block:  Contents
 ***/
// Describe constant Class below
const TagBracket   = function(id) {
  return $SR.generateHtml `
  <div class="tag-bracket" id="${id}">
    <img src="${bracket_open}" style="width:50px;">
    <div>
      <img src="" style="height:50px;">
    </div>
    <img src="${bracket_close}" style="width:50px;">
  </div>
  `; // HTML end
}
export {
  TagBracket
};
