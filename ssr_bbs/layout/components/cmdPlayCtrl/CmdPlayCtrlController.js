/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const CmdPlayCtrlController   = function(cmdPlayCtrlHandler) {

  // private variable
  const FOCUS_CLASS   = 'active';

  // mapping
  const me              = this;
  const backward        = me.childNodes[0];
  const stop            = me.childNodes[1];
  const play            = me.childNodes[2];
  const forward         = me.childNodes[3];

  // Privilege Static Functions
  const removeActiveCss  = function(){
    const array = [play, stop];
    array.forEach(function(e){
      e.classList.remove(FOCUS_CLASS);
    });
  };

  // Access Control: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   time-factor: {
  //     get: () => c,
  //   }
  // });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    offForward(){
      forward.style.display = "none";
    },
    offBackward(){
      backward.style.display = "none";
    },
    trigger_onclickBackward(e){
      backward.onclick(e);
    },
    trigger_onclickPlay(e){
      play.onclick(e);
    },
    trigger_onclickStop(e){
      stop.onclick(e);
    },
    trigger_onclickForward(e){
      forward.onclick(e);
    },
  });

  // Event handler /////////////////////////////////////////////////////////////
  backward.onclick = (e) => {
    if('undefined' !== typeof cmdPlayCtrlHandler.onclick_backward) cmdPlayCtrlHandler.onclick_backward();
  }
  stop.onclick = (e) => {
    let normal;
    if('undefined' !== typeof cmdPlayCtrlHandler.onclick_play) normal = cmdPlayCtrlHandler.onclick_stop(e);
    if(!normal) return;
    removeActiveCss();
    stop.classList.add(FOCUS_CLASS);
  }
  play.onclick = (e) => {
    let normal;
    if('undefined' !== typeof cmdPlayCtrlHandler.onclick_play) normal = cmdPlayCtrlHandler.onclick_play(e);
    if(!normal) return;
    removeActiveCss();
    play.classList.add(FOCUS_CLASS);
  }
  forward.onclick = (e) => {
    if('undefined' !== typeof cmdPlayCtrlHandler.onclick_forward) cmdPlayCtrlHandler.onclick_forward();
  }

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CmdPlayCtrlController
};
