/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const SpeedIndcController   = function(SpeedIndcHandler) {

  // private variable //////////////////////////////////////////////////////////
  const FOCUS_CLASS   = 'active';

  // mapping ///////////////////////////////////////////////////////////////////
  const me              = this;
  const speedQuater     = me.childNodes[0];
  const speedHalf       = me.childNodes[1];
  const speedNomal      = me.childNodes[2];
  const speedDouble     = me.childNodes[3];
  const speedQuadruple  = me.childNodes[4];

  // Privilige Static Functions ////////////////////////////////////////////////
  const setSpeed = function(dom, stringNum){
    me.setAttribute('data-index', stringNum);
    navClassRemove();
    dom.classList.add(FOCUS_CLASS);
  }
  const navClassRemove  = function(){
      const array = [speedQuater,speedHalf,speedNomal,speedDouble,speedQuadruple];
      array.forEach(function(e){
        e.classList.remove(FOCUS_CLASS);
      });
  };
  const traverse = function(idxValue,key,e){
    const arrayLocation = [       0.25,       0.5,          1,           2,              4];
    const arrayTraverse = [speedQuater, speedHalf, speedNomal, speedDouble, speedQuadruple];
    let idx             = arrayLocation.findIndex( e =>( e == idxValue) );
    if ('backword'== key  && 0 < idx) idx = idx - 1;
    if ('forword' == key  && (arrayLocation.length - 1) > idx) idx = idx + 1;
    arrayTraverse[idx].onclick();
  };

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    timefactor: {
      get: function() {
        const c = Number(this.getAttribute('data-index'));
        return c;
      }
    }
  });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    upSpeed(){
      traverse(this.getAttribute('data-index'),'forword');
    },
    downSpeed(){
      traverse(this.getAttribute('data-index'),'backword');
    },
  });

  // Event handler /////////////////////////////////////////////////////////////
  // left
  speedQuater.onclick = (e) => {
    setSpeed(speedQuater, '0.25');
  }
  speedHalf.onclick = (e) => {
    setSpeed(speedHalf, '0.5');
  }
  speedNomal.onclick = (e) => {
    setSpeed(speedNomal, '1');
  }
  speedDouble.onclick = (e) => {
    setSpeed(speedDouble, '2');
  }
  speedQuadruple.onclick = (e) => {
    setSpeed(speedQuadruple, '4');
  }

  // Lazy Initialization ///////////////////////////////////////////////////////
  this.setAttribute('data-index', '1');
  speedNomal.classList.add(FOCUS_CLASS);

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SpeedIndcController
};
