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
      width: '5px',
    },
    {
      name: 'id',
      id: 'id',
      type: 'string',
      icon: '',
      width: '200px',
    },
    {
      name: 'age',
      id: 'age',
      type: 'number',
      icon: '',
      width: '15px',
    },
    {
      name: 'group',
      id: 'socialGroup',
      type: 'string',
      icon: '',
      width: '90px',
    },
    {
      name: 'R number',
      id: 'rNumber',
      type: 'string',
      icon: '',
      width: '90px',
    },
    {
      name: 'infections',
      id: 'infections',
      type: 'string',
      icon: '',
      width: '90px',
    },
    {
      name: 'health',
      id: 'health',
      type: 'number',
      icon: '',
      width: '15px',
    },
    {
      name: '',
      id: 'onMask',
      type: 'number',
      icon: ['fas','fa-head-side-mask'],
      width: '10px',
    },
    {
      name: '',
      id: 'keepDistance',
      type: 'number',
      icon: ['fas','fa-people-arrows'],
      width: '10px',
    },
    {
      name: '',
      id: 'hospital',
      type: 'number',
      icon: ['fas','fa-procedures'],
      width: '10px',
    },
    {
      name: '',
      id: 'lockdown',
      type: 'number',
      icon: ['fas','fa-user-lock'],
      width: '10px',
    },
  ]
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { StaticMultiEditorTableHeader };
