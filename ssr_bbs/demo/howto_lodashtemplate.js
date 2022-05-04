/* eslint-disable no-undef */
// import view block with controller

const SampleTable = function (id) {
  //* Describe Tags
  var compiled = _.template('<b>${value}</b>');
  // const v = compiled({ value: 'hello world' }).toString();
  // console.log('SampleTable v:', v, typeof v);
  return compiled({ value: 'hello world' });
}
export {
  SampleTable
};
