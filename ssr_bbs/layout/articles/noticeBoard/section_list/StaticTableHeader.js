/***
 * staic object: StaticMultiEditorTableHeader
 * static-object must have a 'return value'.
 * static-object use as a function when it called: ex) staticCovid19()
 ***/
// Describe StaticMultiEditorTableHeader Class below

const StaticTableHeader = function() {
  return [
    {
      name: '',
      id: 'isSelected',
      type: 'boolean',
      icon: ['fas','fa-check-circle'],
      width: '2%',
    },
    {
      name: 'RULE_ID',
      id: 'RULE_ID',
      type: 'number',
      icon: '',
      width: '2%',
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
      name: 'HS_CODE',
      id: 'HS_CODE',
      type: 'number',
      icon: '',
      width: '5%',
    },
    {
      name: 'RULE',
      id: 'RULE_CONTENTS',
      type: 'number',
      icon: '',
      width: '8%',
    },
    {
      name: 'RULE_DESCRIPTION',
      id: 'RULE_DESCRIPTION',
      type: 'string',
      icon: '',
      width: '70%',
    },
    // {
    //   name: 'immunity',
    //   id: 'immunities',
    //   type: 'string',
    //   icon: '',
    //   width: '14%',
    // },
    // {
    //   name: 'infections',
    //   id: 'infections',
    //   type: 'string',
    //   icon: '',
    //   width: '14%',
    // },
    // {
    //   name: '',
    //   id: 'onMask',
    //   type: 'number',
    //   icon: ['fas','fa-head-side-mask'],
    //   width: '3%',
    // },
    // {
    //   name: '',
    //   id: 'keepDistance',
    //   type: 'number',
    //   icon: ['fas','fa-people-arrows'],
    //   width: '3%',
    // },
    // {
    //   name: '',
    //   id: 'hospital',
    //   type: 'number',
    //   icon: ['fas','fa-procedures'],
    //   width: '3%',
    // },
    // {
    //   name: '',
    //   id: 'lockdown',
    //   type: 'number',
    //   icon: ['fas','fa-user-lock'],
    //   width: '3%',
    // },
  ]
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { StaticTableHeader };
