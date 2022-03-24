/***
 * staic object: StaticMultiEditorTableHeader
 * static-object must have a 'return value'.
 * static-object use as a function when it called: ex) staticCovid19()
 ***/
// Describe StaticMultiEditorTableHeader Class below
const StaticMultiEditorTableHeader = function() {
  return [
    {
      name: '',
      id: 'isSelected',
      type: 'boolean',
      icon: ['fas','fa-check-circle'],
      width: '2%',
    },
    {
      name: 'id',
      id: 'id',
      type: 'string',
      icon: '',
      width: '27%',
    },
    {
      name: 'age',
      id: 'age',
      type: 'number',
      icon: '',
      width: '5%',
    },
    {
      name: 'health',
      id: 'health',
      type: 'number',
      icon: '',
      width: '6%',
    },
    {
      name: 'group',
      id: 'socialGroup',
      type: 'string',
      icon: '',
      width: '14%',
    },
    {
      name: 'immunity',
      id: 'immunities',
      type: 'string',
      icon: '',
      width: '14%',
    },
    {
      name: 'infections',
      id: 'infections',
      type: 'string',
      icon: '',
      width: '14%',
    },
    {
      name: '',
      id: 'onMask',
      type: 'number',
      icon: ['fas','fa-head-side-mask'],
      width: '3%',
    },
    {
      name: '',
      id: 'keepDistance',
      type: 'number',
      icon: ['fas','fa-people-arrows'],
      width: '3%',
    },
    {
      name: '',
      id: 'hospital',
      type: 'number',
      icon: ['fas','fa-procedures'],
      width: '3%',
    },
    {
      name: '',
      id: 'lockdown',
      type: 'number',
      icon: ['fas','fa-user-lock'],
      width: '3%',
    },
  ]
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { StaticMultiEditorTableHeader };
