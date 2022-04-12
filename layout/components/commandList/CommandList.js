import '/layout/components/commandList/CommandList.css';
import { DropList }  from '/layout/components/dropList/DropList';


/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const CommandList   = function(id, styles) {
  const dropup  = new DropList(id + '-DropUp');
  return $SR.generateHtml `
  <div class="command-list"  id="${id}" style="${styles}">
    <ul class="command-list-contents">
      <li>
        <button><i class="fas fa-binoculars"></i></button>
        <!-- dropUp -->
        ${dropup.outerHTML}
      </li>
      <li><button><i class="fas fa-plus"></i></button></li>
      <li><button><i class="fas fa-th-list"></i></button></li>
      <li><button><i class="fas fa-mouse-pointer"></i></button></li>
      <li><button><i class="fas fa-vector-square"></i></button></li>
      <li><button><i class="fas fa-eraser"></i></button></li>
      <li><button><i class="fas fa-trash-alt"></i></button></li>
    </ul>
  </div>
  `; // HTML end
}
export {
  CommandList
};
