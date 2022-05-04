/***
 * layout:  SubjectController control buttons
 ***/
//* Describe SubjectController layout below
const SubjectController = function (_subjectHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const me            = this;
  const subject       = me.firstChild.firstChild;

  //* Privilege Static Functions ////////////////////////////////////////////////
  // const getPositionInfo = function(e, t){
  //   return {
  //     pageY : e.pageY
  //   }
  // }

  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    subjectValue:{
      set: function(o) {
        subject.innerText = o;
      },
      get: function(){
        return subject.innerText;
      },
      configurable:true
    },
  });

  //* Access control: public functions //////////////////////////////////////////
  // Object.assign(this, {
  //   onUpside(){
  //     upside.style.display = "block";
  //   },
  // });

  //* Event handler /////////////////////////////////////////////////////////////
  // upside.onclick = (e) => {
  //   if('undefined' !== typeof panelNavHandler.onclick_upside) panelNavHandler.onclick_upside(e);
  // }

  //* Lazy Initialization ///////////////////////////////////////////////////////
  // upside.style.display = "none";

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SubjectController
};
