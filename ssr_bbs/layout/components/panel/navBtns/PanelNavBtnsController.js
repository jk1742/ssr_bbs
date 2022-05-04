/***
 * layout:  PanelNavController control buttons
 ***/
//* Describe EditTopBarController layout below
const PanelNavBtnsController   = function(panelNavHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const me    = this;
  let left    = $SR.registerModel(me.children[0]).setInteractive();
  let down    = $SR.registerModel(me.children[1]).setInteractive();
  let up      = $SR.registerModel(me.children[2]).setInteractive();
  let right   = $SR.registerModel(me.children[3]).setInteractive();
  let list    = $SR.registerModel(me.children[4]).setInteractive();
  let write   = $SR.registerModel(me.children[5]).setInteractive();
  let upload  = $SR.registerModel(me.children[6]).setInteractive();
  let check   = $SR.registerModel(me.children[7]).setInteractive();
  let alert   = $SR.registerModel(me.children[8]).setInteractive();

  //* Privilege Static Functions ////////////////////////////////////////////////

  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    left  :{ get: () => left },
    down  :{ get: () => down },
    up    :{ get: () => up },
    right :{ get: () => right },
    write :{ get: () => write },
    upload:{ get: () => upload },
    check :{ get: () => check },
    alert :{ get: () => alert },
    list  :{ get: () => list }
  });

  //* Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    revealUpside:() => upside.style.display = null,
    revealLeft  :() => left.style.display = null,
    revealDown  :() => down.style.display = null,
    revealUp    :() => up.style.display = null,
    revealRight :() => right.style.display = null,
    revealWrite :() => write.style.display = null,
    revealUpload:() => upload.style.display = null,
    revealCheck :() => check.style.display = null,
    revealAlert :() => alert.style.display = null,
    revealList  :() => list.style.display = null,
  });

  //* Event handler /////////////////////////////////////////////////////////////
  // upside.onclick = (e) => {
  //   if('undefined' !== typeof panelNavHandler.onclick_upside) panelNavHandler.onclick_upside(e);
  // }

  //* Lazy Initialization ///////////////////////////////////////////////////////
  left.style.display = "none";
  down.style.display = "none";
  up.style.display = "none";
  right.style.display = "none";
  write.style.display = "none";
  upload.style.display = "none";
  check.style.display = "none";
  alert.style.display = "none";
  list.style.display = "none";

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  PanelNavBtnsController
};
