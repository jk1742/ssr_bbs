/* eslint-disable no-undef */
// layout
import { ToolTip        } from '/layout/components/toolTip/ToolTip';
import { ChapterInfo    } from '/layout/components/chapterInfo/ChapterInfo';
import { CmdPlayCtrl    } from '/layout/components/cmdPlayCtrl/CmdPlayCtrl';
import { CmdSysFormal   } from '/layout/components/cmdSysFormal/CmdSysFormal';
import { RoundPanel     } from '/layout/components/roundPanel/RoundPanel';
import { SortingTable   } from '/layout/components/sortingTable/SortingTable';
import { ProgressBar    } from '/layout/components/progressBar/ProgressBar';
import { CommandList    } from '/layout/components/commandList/CommandList';
import { BlurFilter     } from '/layout/components/blurFilter/BlurFilter';
import { MessageBox     } from '/layout/components/messageBox/MessageBox';

// Static Constants
import { FRAME_SETTING  } from '/class/static/DefineConst';

/***
 * Layout:  EditSection
 ***/
// Describe EditSection Class below
const Section_MultiEditor   = function(id) {
  const chapterInfo         = new ChapterInfo('MultiEditor-ChapterInfo');
  const cmdSysFormal        = new CmdSysFormal('MultiEditor-CmdSysFormal');
  const cmdPlayCtrl         = new CmdPlayCtrl('MultiEditor-CmdPlayCtrl');
  const sortingTable        = new SortingTable('MultiEditor-SortingTable', '85%');
  const roundPanel          = new RoundPanel('MultiEditor-ApplyPanel');
  const progressBar         = new ProgressBar('MultiEditor-bottom-left-status', FRAME_SETTING.DAY);
  const commandList         = new CommandList('MultiEditor-Command-List','float:right');
  const filter              = new BlurFilter('MultiEditor-Filter', 'MultiEditor-Filter-blur');
  const messageBox          = new MessageBox('MultiEditor-MessageBox');
  const toolTip             = new ToolTip('MultiEditor-ToolTip');
  return $SR.generateHtml `
  <section id="${id}">
    <!-- MultiEditor-MessageBox -->
    ${messageBox.outerHTML}
    <!-- MultiEditor-ToolTip -->
    ${toolTip.outerHTML}
    <div class="cont_main">
      <div class="frame-top">
        <div class="frame-top-left">
          <!-- MultiEditor-CmdSysFormal -->
          ${cmdSysFormal.outerHTML}
        </div>
        <div class="frame-top-center">
          <!-- FocusEditor-ChapterInfo -->
          ${chapterInfo.outerHTML}
        </div>
        <div class="frame-top-right">
          <!-- MultiEditor-CmdPlayCtrl -->
          ${cmdPlayCtrl.outerHTML}
        </div>
      </div>
      <div class="frame-mid">
        <div class="frame-mid-center">
          <!-- MultiEditor-SortingTable -->
          ${sortingTable.outerHTML}
          <!-- MultiEditor-ApplyPanel -->
          ${roundPanel.outerHTML}
        </div>
        <!-- MultiEditor-Filter -->
        ${filter.outerHTML}
      </div>
      <div class="frame-btm">
        <div class="frame-btm-left">
          <!-- MultiEditor-bottom-left-status -->
          ${progressBar.outerHTML}
        </div>
        <div class="frame-btm-right">
          <!-- MultiEditor-Command-List -->
          ${commandList.outerHTML}
        </div>
      </div>
    </div>
  </section>
  `; // HTML end
}
export {
  Section_MultiEditor
};
