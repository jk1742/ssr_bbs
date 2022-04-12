import '/layout/components/cmdSysFormal/CmdSysFormal.css';


/***
 * layout:  EditTopBar
 ***/
// Describe EditTopBar layout below
const CmdSysFormal   = function(id) {
  return $SR.generateHtml `
  <div id="${id}" class="cmd-sys-formal">
    <button><i class="fas fa-arrow-alt-circle-up"></i></button>  
    <button><i class="fas fa-arrow-alt-circle-left"></i></button>
    <button><i class="fas fa-upload"></i></button>
    <button><i class="fas fa-check"></i></button>
    <button><i class="fas fa-exclamation-circle"></i><span class="badge"></span></button>
  </div>
  `; // HTML end
}
export {
  CmdSysFormal
};
