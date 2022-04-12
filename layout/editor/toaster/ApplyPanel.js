/***
 * block:  focusView
 ***/
// Describe Layout below
const ApplyPanel   = function(id) {
  return $SR.generateHtml `
  <div class="panel" id ="${id}">
    <div class="panel-contents round text-space">
      <span class='text-space'>compose social group</span>
      <input class='text-space' type="text" value="10">
      <button class="round text-space panel-contents-btn"><span><i class="fas fa-users-cog"></i>inject particles</span></button>
    </div>
  </div>
  `; // HTML end
}
export {
  ApplyPanel
};
