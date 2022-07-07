/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/***
 * SliderBarController
 * @constructor
 * @param {*} _sliderBarHandler
 * @returns
 ***/
const SliderBarController   = function (_sliderBarHandler) {

  //* private variable & mapping /////////////////////////////////////////////////
  const me            = this;
  const sliderDot     = me.children[1];
  const sliderBar     = me.children[0];
  const start         = _sliderBarHandler.getRowHeight() + 8;
  const end           = _sliderBarHandler.getTableHeight() - 16 - 8;
  const parent        = this.parentNode;
  const _private      = {
    start   : 0,
    end     : 0,
    pos     : 0,
    pushed  : false
  }


  //* Privilege Static Functions ////////////////////////////////////////////////
  const getCursorPos = (e) => {
    let y = 0;
    let bar = sliderBar.getBoundingClientRect().top; // bar top pos
    e = (e.changedTouches) ? e.changedTouches[0] : e;
    // calculate the cursor's y coordinate, relative to the slideBar
    y = e.pageY - bar;
    // consider any page scrolling
    y = y - window.pageYOffset;
    return y;
  }
  const slideMove = (y) =>{
    if(start > y) return start;
    if(end < y) return end;
    sliderDot.style.marginTop = `${y}px`;
    return y;
  }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    start: {
      get: () => _private.start,
      set: (o) => { _private.start = o},
      configurable: true,
      enumerable: true
    },
    end:{
      get: () => _private.end,
      set: (o) => { _private.end = o },
      configurable: true,
      enumerable: true
    },
    pos:{
      get: () => _private.pos,
      set: (o) => { _private.pos = o },
      configurable: true,
      enumerable: true
    },
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    scrollNextTic (ticSize, n, page) {
      const totalTic = Math.ceil(page.total / ticSize) - page.size / ticSize;
      const sHeight = end - start;
      this.pos = this.pos + sHeight / totalTic
      slideMove(this.pos);
      //console.log('scrollNextTic', page, n, ticSize);
    },
    scrollPreTic(ticSize, n, page){
      const totalTic = Math.ceil(page.total / ticSize) - page.size / ticSize;
      const sHeight = end - start;
      this.pos = this.pos - sHeight / totalTic
      slideMove(this.pos);
      //console.log('scrollPreTic', page, n, ticSize);
    }
  });


  //* Event handler /////////////////////////////////////////////////////////////
  const fx = (e) => {
    e.preventDefault();
    if (_private.pushed) {
      const pos = getCursorPos(e) + 15 + 7;
      const p = slideMove(pos);
      this.pos = p;
      if ('undefined' !== typeof _sliderBarHandler.onMoved_slideDot) _sliderBarHandler.onMoved_slideDot(start, end, p);
    }
  }
  sliderDot.onmousedown = (_e) => {
    _private.pushed = true;
    parent.onmousemove = fx;
  }
  sliderDot.onmouseup = (_e) => {
    _private.pushed = false;
    parent.onmousemove = null;
  }
  sliderDot.onmouseleave = (_e) => {
    _private.pushed = false;
    parent.onmousemove = null;
  }
  sliderBar.onmouseleave = (_e) => {
    _private.pushed = false;
    parent.onmousemove = null;
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////
  this.pos = slideMove(start);
  this.start = start;
  this.end = end;


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SliderBarController
};
