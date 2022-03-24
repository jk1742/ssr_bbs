import '/layout/components/progressBar/ProgressBar.css';

/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const ProgressBar   = function(id, max) {
  return $SR.generateHtml `
  <div class="progress-bar" id="${id}">
    <ul class="progress-bar-list">
      <li><button><i class="fas fa-coffee"></i></button></li>
      <li><button><i class="fab fa-paypal"></i></button></li>
      <li><button><i class="fas fa-ad"></i></button></li>
      <li><label for="${id}-progress"></label></li>
      <li><progress id="${id}-progress" max="${max}" value="0"></progress></li>
      <li><span></span></li>
      <li></li>
      <li><span></span></li>
      <li><span></span></li>
    </ul>
    <div class="progress-bar-ads">
      <span class="close cursor">&times;</span>
      <!-- <ins class="adsbygoogle" style="display:inline-block;width:250px;height:800px" data-ad-client="ca-pub-1932212120809779" data-ad-slot="9244020652"></ins> -->
    </div>
  </div>
  `; // HTML end
}
export {
  ProgressBar
};
