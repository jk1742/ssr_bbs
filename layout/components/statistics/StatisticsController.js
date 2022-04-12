/***
 * Layout:  DropListContentsController
 ***/

// Describe EntryList Class below
const StatisticsController   = function (statisticsHandler) {

  // private variable & mapping ////////////////////////////////////////////////
  const me            = this;
  const contents      = me.lastChild;
  const nomal         = ['info', 'total', 'asymptomatic', 'light', 'servre', 'critical', 'death'];
  const infection     = ['info', 'total', 'infected',     'masked', 'lockdown', 'immun', 'death'];
  const type          = 'none';

  // Privilige Static Functions ////////////////////////////////////////////////
  const buildStatic   = function(type){
    let array =[...contents.getElementsByClassName('statistics-contents-tag')];
    if('none' == type.toLowerCase()){
      array.forEach((item, i) => {
        item.firstChild.innerHTML = nomal[i];
      });
    } else {
      array.forEach((item, i) => {
        item.firstChild.innerHTML = infection[i];
      });
    }
  }
  function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
      if(arr[i][key] === val) return true;
    }
    return false;
  }

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    status: {
      get: function() {
        let carriage = false;
        if('none' == contents.style.display) carriage = false;
        else carriage = true;
        return carriage;
      }
    },
    type: {
      get: ()  => type,
      set: (o) => type=o,
      enumerable:true
    }
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    toggle(e) {
      let swContents = contents.style.display;
      if('none'==swContents) swContents = 'block';
      else swContents = 'none';
      contents.style.display = swContents;
    },
    update(o, array){
      contents.childNodes[1].lastChild.innerHTML = array.length;
      if('none' == o.toLowerCase()){
        let asymptomatic = 0, light = 0, servre = 0, critical = 0, death = 0;
        contents.childNodes[0].lastChild.innerHTML = 'Social Particles';
        for (var i = 0; i < array.length; i++) {
          let e = array[i];
          switch (e.attribute.healthStatus){
            case 'ASYMPTOMATIC' :
                asymptomatic++;
                break;
            case 'LIGHT' :
                light++;
                break;
            case 'SERVRE' :
                servre++;
                break;
            case 'CRITICAL' :
                critical++;
                break;
            case 'DEATH' :
                death++;
                break;
          }
        }
        contents.childNodes[2].lastChild.innerHTML = asymptomatic;
        contents.childNodes[3].lastChild.innerHTML = light;
        contents.childNodes[4].lastChild.innerHTML = servre;
        contents.childNodes[5].lastChild.innerHTML = critical;
        contents.childNodes[6].lastChild.innerHTML = death;
      } else{
        let infected = 0, masked = 0, lockdown = 0, immun = 0, death = 0;
        contents.childNodes[0].lastChild.innerHTML = o;
        for (var i = 0; i < array.length; i++) {
          let e = array[i];
          if(contains(e.attribute.disease, 'name', o)) infected++;
          if(-1 < e.attribute.putOnMask) masked++;
          if(-1 < e.attribute.lockdown) lockdown++;
          if(contains(e.attribute.immunityPool, 'disease', o)) immun++ ;
          //console.log( 'StatisticsController:', e.attribute.healthStatus, e.attribute.color);
          if('DEATH' == e.attribute.healthStatus) {
            death++;
          }
        }
        contents.childNodes[2].lastChild.innerHTML = infected;
        contents.childNodes[3].lastChild.innerHTML = masked;
        contents.childNodes[4].lastChild.innerHTML = lockdown;
        contents.childNodes[5].lastChild.innerHTML = immun;
        contents.childNodes[6].lastChild.innerHTML = death;
      }
    },
    turnon:() => contents.style.display='block',
    turnoff:() => contents.style.display='none',
  });

  // Event handler /////////////////////////////////////////////////////////////
  this.onclick = (e) => {
    let type = 'none';
    if('undefined' !== typeof statisticsHandler.onclick_this) type = statisticsHandler.onclick_this(e, this.id);
    buildStatic(type);
    this.toggle(e);
  }

  // Lazy Initialization ///////////////////////////////////////////////////////
  contents.style.display = 'none';

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  StatisticsController
};
