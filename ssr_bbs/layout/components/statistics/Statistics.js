import '/layout/components/statistics/Statistics.css';
/***
 * block:  Statistics buttons
 ***/
// Describe constant Class below
const Statistics   = function(id) {
  return $SR.generateHtml `
  <div class="statistics"  id="${id}">
    <button><i class="fas fa-chalkboard"></i><span>Statistics</span></button>
    <div class="statistics-contents">
      <div class="statistics-contents-tag">
        <span>total</span>
        <span>-</span>
      </div>
      <div class="statistics-contents-tag">
        <span>info</span>
        <span>-</span>
      </div>
      <div class="statistics-contents-tag">
        <span>asymptomatic</span>
        <span>-</span>
      </div>
      <div class="statistics-contents-tag">
        <span>light</span>
        <span>-</span>
      </div>
      <div class="statistics-contents-tag">
        <span>servre</span>
        <span>-</span>
      </div>
      <div class="statistics-contents-tag">
        <span>critical</span>
        <span>-</span>
      </div>
      <div class="statistics-contents-tag">
        <span>death</span>
        <span>-</span>
      </div>
    </div>
  </div>
  `; // HTML end
}
export {
  Statistics
};
