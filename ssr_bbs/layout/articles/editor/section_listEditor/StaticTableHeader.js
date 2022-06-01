/***
 * static object: StaticMultiEditorTableHeader
 * static-object must have a 'return value'.
 * static-object use as a function when it called: ex) staticCovid19()
 ***/
// Describe StaticMultiEditorTableHeader Class below

import { SelectController } from "./SelectController";
import { Select } from "/layout/components/form/select/Select";

const StaticTableHeader = function() {
  const rule = new Select();
  rule.classList.add('is-small');
  return [
    {
      name: '',
      id: 'isSelected',
      type: 'boolean',
      icon: ['fas','fa-check-circle'],
      width: '2%',
    },
    {
      name: 'HS_CODE',
      id: 'HS_CODE',
      type: 'number',
      icon: '',
      width: '5%',
    },
    {
      name: 'RULE_ID',
      id: 'RULE_ID',
      type: 'number',
      icon: '',
      width: '0%',
      display: 'none',
      isKey: true
    },
    {
      name: 'FTA_CODE',
      id: 'FTA_CODE',
      type: 'string',
      icon: '',
      width: '5%',
    },
    {
      name: 'SEQ',
      id: 'RULE_SEQ',
      type: 'string',
      icon: '',
      width: '2%',
    },
    {
      name: 'RULE',
      id: 'RULE_CONTENTS',
      type: 'string',
      icon: '',
      width: '5%',
      editor: {
        dom: rule,
        controller: SelectController,
        // handler: {
        //   onload: (obj, json)=>{
        //     console.log(obj, json);
        //   }
        // }
      }
    },
    {
      name: 'De Minimis',
      id: 'DE_MINIMIS_RATE',
      type: 'string',
      icon: '',
      width: '7%',
    },
    {
      name: 'RULE_DESCRIPTION',
      id: 'RULE_DESCRIPTION',
      type: 'string',
      icon: '',
      width: '70%',
    }
  ]
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { StaticTableHeader }
