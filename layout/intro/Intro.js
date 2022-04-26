/* eslint-disable no-undef */
// import { ServicePanel   } from '/layout/header/ServicePanel';
import '/layout/intro/Intro.css'
import video from '/static/videos/video.mp4';

/***
 * block:  intro
 ***/
// Describe constant Class below
const Intro   = function(id, styles) {
  return $SR.generateHtml `
  <article id="${id}" class="intro-frame" style="${styles}">
    <Section>
      <div class="cont_main">
        <video autoplay muted loop id="backgroundVideo">
          <source src="${video}" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
        <div class="intro-content">
          <h1>Heading</h1>
          <p>Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei. Id qui nemore latine molestiae, ad mutat oblique delicatissimi pro.</p>
          <div class="steps">
        </div>
      </div>
    </Section>
  </article>
  `; // HTML end
}
export {
  Intro
};
