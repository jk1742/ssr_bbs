//import '/layout/components/blurAlert/BlurAlert.css';


/***
 * block:  BlurAlert
 ***/
// Describe Layout below
const BlurFilter   = function(id, filterId) {
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `.${filterId} {
    -webkit-filter: url(#${filterId});
    filter: url(#${filterId});
  }`;
  document.getElementsByTagName('head')[0].appendChild(style);
  return $SR.generateHtml `
  <svg id="${id}" style="display:none">
    <filter id="${filterId}">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur>
    </filter>
  </svg>
  `; // HTML end
}
export {
  BlurFilter
};
