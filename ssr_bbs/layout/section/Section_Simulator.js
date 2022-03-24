/* eslint-disable no-undef */
// import view block with contorller
import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';
import { CmdSysFormal   } from '/layout/components/cmdSysFormal/CmdSysFormal';
import { CmdPlayCtrl    } from '/layout/components/cmdPlayCtrl/CmdPlayCtrl';
// import { CmdAds         } from '/layout/components/cmdAds/CmdAds';
import { SpeedIndc      } from '/layout/components/speedIndc/SpeedIndc';
import { CanvasMonitor  } from '/layout/section/CanvasMonitor';
import { FocusBridge    } from '/layout/section/FocusBridge';
import { ProgressBar    } from '/layout/components/progressBar/ProgressBar';
import { Statistics     } from '/layout/components/statistics/Statistics';
import { CommandList    } from '/layout/components/commandList/CommandList';
import { BlurFilter     } from '/layout/components/blurFilter/BlurFilter';
import { MessageBox     } from '/layout/components/messageBox/MessageBox';
import { ToolTip        } from '/layout/components/toolTip/ToolTip';

// static
import { FRAME_SETTING  } from '/class/static/DefineConst';

const Section_Simulator = function (id) {
  const chapterInfo     = new ChapterInfo('Simulator-ChapterInfo');
  const cmdSysFormal    = new CmdSysFormal('Simulator-CmdSysFormal');
  const speedIndc       = new SpeedIndc('Simulator-SpeedIndc');
  const cmdPlayCtrl     = new CmdPlayCtrl('Simulator-CmdPlayCtrl');
  // const cmdAds          = new CmdAds('Simulator-CmdAds');
  const canvas          = new CanvasMonitor('Canvas-Monitor');
  const progressBar     = new ProgressBar('Simulator-ProgressBar', FRAME_SETTING.DAY);
  const statistics      = new Statistics('Simulator-Statistics');
  const commandList     = new CommandList('Simulator-Command-List','float:right');
  const selectedId      = new FocusBridge('Focus-Bridge');
  const filter          = new BlurFilter('Simulator-Filter', 'Simulator-Filter-blur');
  const messageBox      = new MessageBox('Simulator-MessageBox');
  const toolTip         = new ToolTip('Simulator-ToolTip');
  return $SR.generateHtml `
  <section id="${id}">
    <!-- Simulator-MessageBox -->
    ${messageBox.outerHTML}
    <!-- Simulator-ToolTip -->
    ${toolTip.outerHTML}
    <div class="cont_main">
      <div class="frame-top">
        <div class="frame-top-left">
          <!-- Simulator-EditTopBar -->
          ${cmdSysFormal.outerHTML}
          <!-- Simulator-SpeedIndc -->
          ${speedIndc.outerHTML}
        </div>
        <div class="frame-top-center">
          <!-- Simulator-ChapterInfo -->
          ${chapterInfo.outerHTML}
        </div>
        <div class="frame-top-right">
          <!-- Simulator-CmdPlayCtrl -->
          ${cmdPlayCtrl.outerHTML}
        </div>
      </div>
      <div class="frame-mid">
        <div class="display-table-container">
          <div class="display-table-middle">
            <div class="display-table-box">
              <!-- Canvas-Monitor -->
              ${canvas.outerHTML}
            </div>
          </div>
        </div>
        <!-- Simulator-Filter -->
        ${filter.outerHTML}
      </div>
      <div class="frame-btm">
        <div class="frame-btm-left">
          <!-- Simulator-ProgressBar -->
          ${progressBar.outerHTML}
        </div>
        <div class="frame-btm-center">
          <!-- Simulator-Statistics -->
          ${statistics.outerHTML}
        </div>
        <div class="frame-btm-right">
          <!-- Simulator-Command-List -->
          ${commandList.outerHTML}
        </div>
      </div>
    </div>
    <!-- Focus-View -->
    ${selectedId.outerHTML}
  </section>
  `; // HTML end
}
export {
  Section_Simulator
};
