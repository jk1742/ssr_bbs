/***
 * layout:  Subject
 ***/
// Describe Subject layout below
const Subject = function(id) {
  return $SR.generateHtml `
  <div class= "column" id="${id}">
    <div class="content"><h3 class="article-subject">subject name</h3></div>
  </div>
  `; // HTML end
}
export {
  Subject
};
