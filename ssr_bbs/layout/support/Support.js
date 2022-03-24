// import view block with contorller
import { CmdSysFormal   } from '/layout/components/cmdSysFormal/CmdSysFormal';
import { Contents       } from '/layout/support/Contents';
import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';
//
import support_bg  from '/static/img/support/support_bg.jpg';
import iconSSR     from '/static/img/support/iconSSR.png';

/***
 * block:  focusView
 ***/
// Describe constant Class below
const Support   = function(id) {
  const chapterInfo     = new ChapterInfo('Support-ChapterInfo');
  const cmdSysFormal    = new CmdSysFormal('Support-CmdSysFormal');
  const supportContents = new Contents('Support-Contents');
  return $SR.generateHtml `
  <section id="${id}">
    <!-- Support-MessageBox -->
    <!-- Support-ToolTip -->
    <div class="cont_main" style="background-image:url(${support_bg}); background-size: auto 100%;">
      <div class="frame-top">
        <div class="frame-top-left">
          <!-- Support-CmdSysFormal -->
          ${cmdSysFormal.outerHTML}
          <!-- Support-SpeedIndc -->
        </div>
        <div class="frame-top-center">
          <!-- Support-ChapterInfo -->
          ${chapterInfo.outerHTML}
        </div>
        <div class="frame-top-right">
          <!-- Support-CmdPlayCtrl -->
        </div>
      </div>
      <div class="frame-mid">
        <div class="display-table-container" style="height: 50%; margin-bottom: 2vh;">
          <div class="display-table-middle">
            <div class="display-table-box" style="max-width: 1024px; width:80%">
              <h3>About Simulator</h3>
              <span class="supports-text">
              This work just started from my curiosity which is "how does a virus spread?". I mixed reflexing ball and transition of status. next attached some functions and user interfaces. Because of the web browser's performance, reflexing balls have 500 limit capability; I can change it to unlimited by cloud work, but I don't know it's worth it. This simulation result does not show a practical or medical conclusion due to particle cases being too small. Nevertheless, I guess it would help understand that how does a virus spreads. If you'd like to develop this more or it was fun, buy me a coffee then. Please, send me your opinion by below e-mail. Paypal support is also welcome.
              <i font-weight="bold"> Support us: </i>
              <a onclick="window.open('https://twitter.com/synthesis_of', '_blank').focus();"><i class="fab fa-twitter-square"></i></a>
              <a onclick="window.open('https://www.buymeacoffee.com/synthofintel', '_blank').focus();" style="color:GoldenRod;"><i class="fas fa-coffee"></i></a>
              <a onclick="window.open('https://paypal.me/synthesisIntel/1', '_blank').focus();" style="color:#1E90FF;"><i class="fab fa-paypal"></i></a>
              </span>
              <h3>About $SR <img src="${iconSSR}" style="height:30px;margin-left:5px;"></h3>
              <span class="supports-text">
                This SPA(Single Page Application) has been build by using the "SSR"(Simple Slide Rendering) Working Set library. If you would like to request us to publish a SPA website, please contact us by e-mail: <a href="mailto:synthesis.intellect@gmail.com"><i class="fas fa-envelope"></i></a>; $SR can support SSR(Server Side Rendering).  The free image donators in unsplash.com(Kelly Sikkema, Marcelo Leal, Hush Naidoo, Piron Guillaume, Engin Akyurt) were very supportive of this app.
              </span>
              <div style="margin-top:9vh;">
                <i style="margin-left: 7vw;">Ticket of monthly supporters</i>
                <div id="smart-button-container" style="opacity: 0.7;">
                  <div style="text-align: center;">
                    <div id="paypal-button-container"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="display-table-container" style="height: 8%;">
          <div class="display-table-middle">
            <div class="display-table-box">
              <!-- Support-Contents -->
              ${supportContents.outerHTML}
            </div>
          </div>
        </div>
        <div class="display-table-container" style="height: 10%;">
          <div class="display-table-middle">
            <div class="display-table-box">
              Copyright 2021. Roén-Comunication Korea Co. all rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Focus-View -->
  </section>
  `; // HTML end
}
export {
  Support
};
