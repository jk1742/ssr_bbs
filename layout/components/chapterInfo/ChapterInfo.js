import '/layout/components/chapterInfo/ChapterInfo.css';


/***
 * block:  focusView
 ***/
// Describe Layout below
const ChapterInfo  = function(id) {
  return $SR.generateHtml `
  <div class="chapter-info" id="${id}" >
    <span></span>
  </div>
  `; // HTML end
}
export {
  ChapterInfo
};
