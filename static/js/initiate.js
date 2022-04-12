/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/***
 * class: Initiate
 ***/
// Describe Initiate Class below
const initiate = function() {

  // private variable //////////////////////////////////////////////////////////
  let   history     = $SR.History.getInstance('PageHistory');
  let   onResize    = $SR.EventCarrier.getInstance('ResizeEvent');
  const header      = document.getElementsByTagName('header')[0];
  const sections    = Array.from(document.getElementsByTagName('section'));
  let   htmlArray   = [header];
  htmlArray         = htmlArray.concat(sections);

  // Privilege Static Functions ////////////////////////////////////////////////
  const buildFrame  = function(htmlArray){
    //let   stackHeight = 0;
    const inHeight    = window.innerHeight;
    const outHeight   = inHeight + 100;
    for (let i = 0; i < htmlArray.length; i++) {
      const e         = htmlArray[i];
      let   topHeight = 0;
      let   btmHeight = 0;
      e.style.height  = `${outHeight}px`;
      e.style.width   = `${window.innerWidth}px`;
      let   topElements = e.getElementsByClassName('frame-top');
      if(0 < topElements.length) {
        const el      = topElements[0];
        topHeight     = el.getBoundingClientRect().height;
      }
      let   bottomElements = e.getElementsByClassName('frame-btm');
      if(0 < bottomElements.length) {
        const elBtm           = bottomElements[0];
        const elHeight        = elBtm.getBoundingClientRect().height;
        elBtm.style.position  = 'absolute';
        elBtm.style.top       = `${(i * outHeight + inHeight + 2) - elHeight}px`;
        elBtm.style.left      = '0px';
        elBtm.style.right     = '0px';
        btmHeight             = elHeight;
      }
      let   midElements = e.getElementsByClassName('frame-mid');
      if(0 < midElements.length) {
        const el              = midElements[0];
        el.style.height       = `${inHeight - (topHeight + btmHeight)}px`;
      }
    }
  }// buildFrame end
  const findNearestSection  = function(htmlArray){
    let leastN;
    let carriage;
    htmlArray.find((e)=>{
      const n = Math.abs(e.getBoundingClientRect().y);
      if (typeof leastN == 'undefined' || leastN > n){
        leastN = n;
        carriage = e;
      }
    });
    return carriage;
  }// findNearestSection end
  const hideAll = function(){
    let arrayCon = [...document.getElementsByClassName('cont_main')];
    arrayCon.forEach((item, i) => {
      item.style.opacity = 0;
      item.className = 'cont_main';
    });
    let arrayTop = [...document.getElementsByClassName('frame-top')];
    arrayTop.forEach((item, i) => {
      item.style.opacity = 0;
      item.style.visibility = 'hidden';
      item.className = 'frame-top';
    });
    let arrayBtm = [...document.getElementsByClassName('frame-btm')];
    arrayBtm.forEach((item, i) => {
      item.style.opacity = 0;
      item.style.visibility = 'hidden';
      item.className = 'frame-btm';
    });
    let arrayMid = [...document.getElementsByClassName('frame-mid')];
    arrayMid.forEach((item, i) => {
      item.style.opacity = 0;
      item.style.visibility = 'hidden';
      item.className = 'frame-mid';
    });
  }// hideAll()
  const getNameInsertAnimation = function(){
    let stampHead = 'frame-action_insert-';
    const n = $SR.getRandomIntInclusive(0,3);
    switch(n){
    case 1:
      stampHead += 'top';
      break;
    case 2:
      stampHead += 'right';
      break;
    case 3:
      stampHead += 'left';
      break;
    default:
      stampHead += 'bottom';
    }
    return stampHead;
  }// getRandomInsertAnimation()

  // Event handler /////////////////////////////////////////////////////////////
  window.onresize = _.debounce(function(e){
    buildFrame(htmlArray);
    onResize.emit('window',{resized:true});
    const posDom = document.getElementById(history.cur());
    $SR.moveScreen_bak(posDom);
  }, 300);
  // set frame relocation animation
  history.onHistoryItemAppended = (e) => {
    let   cursor = history.cur();
    const posDom = document.getElementById(cursor);
    console.log('onHistoryItemAppended:',cursor, posDom);
    hideAll();
    _.debounce(function(e){
      if (0 < posDom.getElementsByClassName('cont_main').length) posDom.getElementsByClassName('cont_main')[0].classList.add('content_fade-in');
    }, 1000)();
    _.debounce(function(e){// getNameInsertAnimation
      if (0 < posDom.getElementsByClassName('frame-mid').length) posDom.getElementsByClassName('frame-mid')[0].classList.add(getNameInsertAnimation());
      if (0 < posDom.getElementsByClassName('frame-btm').length) posDom.getElementsByClassName('frame-btm')[0].classList.add(getNameInsertAnimation());
      if (0 < posDom.getElementsByClassName('frame-top').length) posDom.getElementsByClassName('frame-top')[0].classList.add(getNameInsertAnimation());
    }, 1000)();
  }

  // initiate Action ///////////////////////////////////////////////////////////
  // set section position
  buildFrame(htmlArray);

  // adjust scroll
  _.debounce(function(e){
    $SR.moveScreen_bak(header);
    hideAll();
  },350)();
}
// Declare Point Class  *** Do not change line sequence ***
export { initiate };
