/* eslint-disable no-unused-vars */
/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const EditorBotBarController   = function (applyPanelhandler) {
  
  // mapping ///////////////////////////////////////////////////////////////////
  const paticleCnt          = this.firstChild.childNodes[10].firstChild;
  const arrayNode           = [];
  for (let i = 0; i < 10; i++) {
    arrayNode.push(this.firstChild.childNodes[i].firstChild);
  }

  // Event handler /////////////////////////////////////////////////////////////
  // inject.onclick = (e) => {
  //     applyPanelhandler.onclick_inject(e, this.paticleCnt);
  // }

  // Privilige Static Functions ////////////////////////////////////////////////
  const draw = function(o){
    let k = Number(Math.floor(o/50));
    for (let j = 0; j < k; j++) {
      if(arrayNode.length <= j) continue;
      arrayNode[j].style.color = 'orange';
    }
  }

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    // paticleCnt: {
    //   get: function() {
    //     const o = Number(paticleCnt.value);
    //     return ('NaN' === o)? 0:o;
    //   }
    // }
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    updatePopCnt (o) {
      paticleCnt.innerHTML = o;
      draw(o);
    }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  EditorBotBarController
};
