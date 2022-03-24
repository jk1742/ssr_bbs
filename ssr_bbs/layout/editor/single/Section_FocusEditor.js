import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';
import { CmdPlayCtrl    } from '/layout/components/cmdPlayCtrl/CmdPlayCtrl';
import { CmdSysFormal   } from '/layout/components/cmdSysFormal/CmdSysFormal';
import { SelectGroup    } from '/layout/components/selectGroup/SelectGroup';
import { EntryList      } from '/layout/editor/single/EntryList';
import { RoundPanel     } from '/layout/components/roundPanel/RoundPanel';
import { ProgressBar    } from '/layout/components/progressBar/ProgressBar';
import { PositionInfo   } from '/layout/components/positionInfo/PositionInfo';
import { BlurFilter     } from '/layout/components/blurFilter/BlurFilter';
import { MessageBox     } from '/layout/components/messageBox/MessageBox';
import { ToolTip        } from '/layout/components/toolTip/ToolTip';

import { FRAME_SETTING  } from '/class/static/DefineConst';


/***
 * Layout:  Section_FocusEditor
 ***/
// Describe Section_FocusEditor Class below
const Section_FocusEditor   = function(id) {
  const chapterInfo         = new ChapterInfo('FocusEditor-ChapterInfo');
  const cmdSysFormal        = new CmdSysFormal('FocusEditor-CmdSysFormal');
  const cmdPlayCtrl         = new CmdPlayCtrl('FocusEditor-CmdPlayCtrl');
  const selectDisease       = new SelectGroup('FocusEditor-SelectDisease');
  const selectGroup         = new SelectGroup('FocusEditor-SelectGroup');
  const entrylist           = new EntryList('FocusEditor-Entry-List');
  const progressBar         = new ProgressBar('FocusEditor-bottom-left-status', FRAME_SETTING.DAY);
  const roundPanel          = new RoundPanel('FocusEditor-ApplyPanel');
  const positionInfo        = new PositionInfo('FocusEditor-PositionInfo');
  const filter              = new BlurFilter('FocusEditor-Filter', 'FocusEditor-Filter-blur');
  const messageBox          = new MessageBox('FocusEditor-MessageBox');
  const toolTip             = new ToolTip('FocusEditor-ToolTip');

  return $SR.generateHtml `
  <section id="${id}">
    <!-- FocusEditor-MessageBox -->
    ${messageBox.outerHTML}
    <!-- FocusEditor-ToolTip -->
    ${toolTip.outerHTML}
    <div class="cont_main">
      <div class="frame-top">
        <div class="frame-top-left">
          <!-- FocusEditor-CmdSysFormal -->
          ${cmdSysFormal.outerHTML}
        </div>
        <div class="frame-top-center">
          <!-- FocusEditor-ChapterInfo -->
          ${chapterInfo.outerHTML}
        </div>
        <div class="frame-top-right">
          <!-- FocusEditor-CmdPlayCtrl -->
          ${cmdPlayCtrl.outerHTML}
        </div>
      </div>
      <div class="frame-mid">
        <div class="frame-mid-center">
          <!-- FocusEditor-SelectGroup -->
          ${selectGroup.outerHTML}
          <!-- FocusEditor-SelectDisease -->
          ${selectDisease.outerHTML}
          <!-- EntryList -->
          ${entrylist.outerHTML}
          <!-- FocusEditor-ApplyPanel -->
          ${roundPanel.outerHTML}
        </div>
        <!-- FocusEditor-Filter -->
        ${filter.outerHTML}
      </div>
      <div class="frame-btm">
        <div class="frame-btm-left">
          <!-- FocusEditor-bottom-left-status -->
          ${progressBar.outerHTML}
        </div>
        <div class="frame-btm-right">
          <!-- FocusEditor-PositionInfo -->
          ${positionInfo.outerHTML}
        </div>
      </div>
    </div>
  </section>
  `; // HTML end
}
export {
  Section_FocusEditor
};
