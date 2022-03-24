import { ChapterInfo  } from '/layout/components/chapterInfo/ChapterInfo';
import { SelectGroup  } from '/layout/components/selectGroup/SelectGroup';
import { EntryList    } from '/layout/editor/toaster/EntryList';
import { CmdSysFormal } from '/layout/components/cmdSysFormal/CmdSysFormal';
import { ApplyPanel   } from '/layout/editor/toaster/ApplyPanel';
import { EditorBotBar } from '/layout/editor/toaster/EditorBotBar';
import { BlurFilter   } from '/layout/components/blurFilter/BlurFilter';
import { MessageBox   } from '/layout/components/messageBox/MessageBox';
import { ToolTip      } from '/layout/components/toolTip/ToolTip';

/***
 * Layout:  Toaster
 ***/
// Describe Toaster Class below
const Section_Toaster   = function(id) {
  const chapterInfo   = new ChapterInfo('Toaster-ChapterInfo');
  const cmdSysFormal  = new CmdSysFormal('Toaster-CmdSysFormal');
  const selectDisease = new SelectGroup('Toaster-SelectDisease');
  const selectGroup   = new SelectGroup('Toaster-SelectGroup');
  const entrylist     = new EntryList('Toaster-EntryList');
  const applyPanel    = new ApplyPanel('Toaster-ApplyPanel');
  const editBotBar    = new EditorBotBar('Toaster-EditBotBar');
  const filter        = new BlurFilter('Toaster-Filter', 'Toaster-Filter-blur');
  const messageBox    = new MessageBox('Toaster-MessageBox');
  const toolTip       = new ToolTip('Toaster-ToolTip');
  
  return $SR.generateHtml `
  <section id="${id}">
    <!-- Toaster-MessageBox -->
    ${messageBox.outerHTML}
    <!-- Toaster-ToolTip -->
    ${toolTip.outerHTML}
    <div class="cont_main">
      <div class="frame-top">
        <div class="frame-top-left">
          <!-- Toaster-EditTopBar -->
          ${cmdSysFormal.outerHTML}
        </div>
        <div class="frame-top-center">
          <!-- Toaster-ChapterInfo -->
          ${chapterInfo.outerHTML}
        </div>
      </div>
      <div class="frame-mid">
        <div class="frame-mid-center">
          <!-- Toaster-SelectGroup -->
          ${selectGroup.outerHTML}
          <!-- Toaster-SelectDisease -->
          ${selectDisease.outerHTML}
          <!-- Toaster-EntryList -->
          ${entrylist.outerHTML}
          <!-- Toaster-EntryList -->
          ${applyPanel.outerHTML}
        </div>
        <!-- Toaster-Filter -->
        ${filter.outerHTML}
      </div>
      <div class="frame-btm">
        <!-- Toaster-EditBotBar -->
        ${editBotBar.outerHTML}
      </div>
    </div>
  </section>
  `; // HTML end
}
export {
  Section_Toaster
};
