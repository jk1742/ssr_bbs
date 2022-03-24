import BgMap            from '/static/img/seoul.png';
import { BoxSelect    } from '/class/BoxSelect';
import { LivePoint    } from '/class/LivePoint';
import { Point        } from '/class/Point';
import { SocialGroup  } from '/class/SocialGroup';
import { CanvasModel  } from '/class/CanvasModel';

// import STATIC ///////////////////////////////////////////////////////////////
import { FRAME_SETTING } from '/class/static/DefineConst';


/***
 * block:  CanvasMonitorController
 ***/
// Describe CanvasMonitorController Class below
const CanvasMonitorController   = function(canvasMonitorHandler, config) {

  // private variable //////////////////////////////////////////////////////////
  const me                    =this;
  let   ctx;
  let   canvasModel;
  let   isRunning             = false;
  let   frequency             = 0;
  let   preTic                = 0;
  let   history               = $SR.History.getInstance('PageHistory');
  let   state                 = $SR.VolatileState.getInstance();
  let   viewFilter            = 'nomal';
  let   viewFilterDisease     = 'Covid19';
  let   intervalInstance;

  // mapping ///////////////////////////////////////////////////////////////////

  // Event handler /////////////////////////////////////////////////////////////
  this.onmousedown = (e) => {
    if(canvasModel.currentAction == 'BoxSelect'){
      let boxSelect                       = new BoxSelect();
      boxSelect.start                     = new LivePoint(e.layerX,e.layerY);
      boxSelect.finish                    = new LivePoint(e.layerX,e.layerY);
      // canvasModel input
      canvasModel.boxSelect               = boxSelect;
      canvasMonitorHandler.focusEditor_clearInfoTable();
    }
  }
  this.onmouseup = (e) => {
    if(!canvasModel.isAliveBoxSelect()) return;
    const sbsX = canvasModel.boxSelect.start.x < canvasModel.boxSelect.finish.x ? canvasModel.boxSelect.start.x : canvasModel.boxSelect.finish.x;
    const sbsY = canvasModel.boxSelect.start.y < canvasModel.boxSelect.finish.y ? canvasModel.boxSelect.start.y : canvasModel.boxSelect.finish.y;
    const sbfX = canvasModel.boxSelect.finish.x < canvasModel.boxSelect.start.x ? canvasModel.boxSelect.start.x : canvasModel.boxSelect.finish.x;
    const sbfY = canvasModel.boxSelect.finish.y < canvasModel.boxSelect.start.y ? canvasModel.boxSelect.start.y : canvasModel.boxSelect.finish.y;
    let   idx = 0;
    // selection mark to grabed object
    canvasModel.particles.forEach(e => {
      if(
        (sbsX < e.position.x) &&
        (e.position.x < sbfX) &&
        (sbsY < e.position.y) &&
        (e.position.y < sbfY)
      ) {
        e.attribute.isSelected = true;
        idx++;
      } else {
        e.attribute.isSelected = false;
      }
    });
    canvasModel.boxSelect.off();
    canvasMonitorHandler.focusBridge_changeItemsCnt(idx);
    _.debounce(()=>{
      rander(canvasModel, 0);
    }, 100)();
  }
  this.onmouseleave = (e) => {
    this.onmouseup(e);
  }
  this.onmousemove = _.throttle((e)=>{
    if(!canvasModel.isAliveBoxSelect()) return;
    canvasModel.boxSelect.finish = new LivePoint(e.layerX,e.layerY);
    rander(canvasModel, 0);
  }, 100);
  // Canvas Click Event: select an object
  this.onclick   = (e) => {
    if( canvasModel.currentAction != 'none') return;
    let pos;
    const browser = $SR.getBrowserInfo();
    if(browser.isChrome || browser.isEdge) pos = new Point(e.layerX, e.layerY);
    else{
      const rect = this.getBoundingClientRect();
      pos = new Point(e.clientX - rect.left, e.clientY - rect.top);
    }
    // initiate info panel
    canvasMonitorHandler.focusEditor_clearInfoTable();
    canvasMonitorHandler.focusBridge_clearFocus();
    const que = canvasModel.particles;
    const max = que.length;
    if(max < 0) return;
    for(let i =0;i<max;i++){
      const obj = que[i].position;
      // get delta
      const delta = Math.sqrt(
        Math.pow(Math.abs(obj.x) - Math.abs(pos.x),2)
        +
        Math.pow(Math.abs(obj.y) - Math.abs(pos.y),2)
      );
      if(delta < que[i].attribute.radius) {
        // check focus
        que[i].attribute.onFocus        = true;
        const selectedGroup             = [];
        que[i].attribute.group.forEach(
          (e) => {selectedGroup.push( new SocialGroup( e.name, e.speed, e.health, e.recovery, e.img))}
        );
        canvasMonitorHandler.focusEditor_bindSocialGroup(selectedGroup);
        canvasMonitorHandler.focusBridge_bindId(que[i].attribute.id);
      } else {
        que[i].attribute.onFocus        = false;
      }
    }
    rander(canvasModel, 0);
  }
  this.ondblclick = (e) => {
    if( canvasModel.currentAction != 'none') return;
    const que = canvasModel.particles;
    const focusObj = que.find(e =>(e.attribute.onFocus === true));
    if('undefined' === typeof focusObj) return;
    canvasMonitorHandler.ondblclick_focusedItem(e, focusObj);
  }

  // privilege functions ///////////////////////////////////////////////////////
  function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
      if(arr[i][key] === val) return true;
    }
    return false;
  }
  const stop = function(){
    window.cancelAnimationFrame(intervalInstance);
    rander(canvasModel, 0);
    isRunning = false;
    state.store('simulator.isRunning', isRunning);
  }
  const run = function(){
    const speed = canvasMonitorHandler.speedIndc_getTimefctr();
    rander(canvasModel, speed);
    // update status
    let curTic = Math.floor(frequency / (FRAME_SETTING.DAY / 16));
    if(preTic != curTic){
      canvasMonitorHandler.trigger_updateStatus(frequency, canvasModel.particles);
      if('MultiEditor' === history.cur()) canvasMonitorHandler.multiEditor_updateTable(canvasModel.particles);
    }
    preTic = curTic;
    // running conditions
    frequency = frequency + (1 * speed);
    isRunning = true;
    state.store('simulator.isRunning', isRunning);
    intervalInstance = window.requestAnimationFrame(run);
  }
  const rander = function(canvasModel, timefactor ) {
    const que       = canvasModel.particles;
    const queLength = canvasModel.particles.length;
    let   modelOn   = (0 < timefactor)? true:false;
    canvasModel.timefactor = timefactor;
    //modelOn check
    if(typeof modelOn === 'undefined') modelOn = false;
    // clear canvas
    ctx.clearRect(0, 0, canvasModel.width, canvasModel.height);
    // time check
    // const startTime = performance.now();
    // start draw canvas
    for (var i = 0; i < queLength; i++) {
      const e = que[i];
      //check status
      ctx.beginPath();
      ctx.globalAlpha = 1;
      if(e.attribute.onFocus){
        // draw circle outline
        ctx.arc(e.position.x, e.position.y, (e.attribute.radius + 4), 0, Math.PI * 2);
        ctx.fillStyle = e.attribute.color;
        ctx.strokeStyle = FRAME_SETTING.SELECTED_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if(e.attribute.isSelected){
        ctx.arc(e.position.x, e.position.y, (e.attribute.radius + 1), 0, Math.PI * 2);
        ctx.fillStyle = e.attribute.color;
        ctx.strokeStyle = FRAME_SETTING.SELECTED_COLOR;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      // draw position
      ctx.beginPath();
      ctx.arc(e.position.x, e.position.y, e.attribute.radius, 0, Math.PI * 2);
      if('spread' == viewFilter) {
        if(contains(e.attribute.disease, 'name', viewFilterDisease)) ctx.fillStyle = '#B22222';
        else  ctx.fillStyle = 'gray';
        if(contains(e.attribute.immunityPool, 'disease', viewFilterDisease)) ctx.fillStyle = '#228B22';
        if('DEATH'==e.attribute.healthStatus) ctx.fillStyle = 'black';
      } else ctx.fillStyle = e.attribute.color;
      ctx.fill();
      ctx.closePath();
      // calculator //////////////////////////////////////////////////////////////
      if(modelOn)canvasModel.run(e);
    }
    // const duration = performance.now() - startTime;
    // if((50 < duration) && (100 > duration)) console.log(`rander took 50ms over`);
    // if(100 < duration) console.log(`rander took ${duration} over`);
    // draw select box
    /*
    if(
      window.rander.selectBox.stat ||
      window.rander.selectBox.start.stat
      //|| window.rander.selectBox.finish.stat
    ){
      ctx.beginPath();
      ctx.moveTo(window.rander.selectBox.start.x, window.rander.selectBox.start.y);
      ctx.lineTo(window.rander.selectBox.finish.x, window.rander.selectBox.finish.y );
      ctx.stroke();
    }
    */
    // draw select box // canvasModel
    if(canvasModel.isAliveBoxSelect()) {
      ctx.beginPath();
      const sbsX = canvasModel.boxSelect.start.x;
      const sbsY = canvasModel.boxSelect.start.y;
      const sbfX = canvasModel.boxSelect.finish.x;
      const sbfY = canvasModel.boxSelect.finish.y;
      ctx.globalAlpha = 0.2;
      ctx.fillRect(sbsX, sbsY, -(sbsX - sbfX), -(sbsY - sbfY));
    }
  }

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    cavasWidth: {
      get: function() {
        return this.width;
      }
    },
    cavasHeight: {
      get: function() {
        return this.height;
      }
    },
    backgroundImage: {
      get: function() {
        return this.style.backgroundImage;
      },
      set: function(o) {
        this.style.backgroundImage = "url(" + o + ")";
      }
    },
    model: {
      get: function() {
        return canvasModel;
      }
    },
    isRunning: {
      get: function() {
        return isRunning;
      }
    },
    frequency:{
      get: function() {
        return frequency;
      },
      set: function(o) {
        frequency = o;
      }
    },
    viewFilter:{
      get: function() {
        return viewFilter;
      },
      set: function(o) {
        viewFilter = o;
      }
    },
    days: {
      get: function() {
        return parseInt(frequency / FRAME_SETTING.DAY);
      },
      enumerable:true
    },
  });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // seperate a function cal and rander
    play(){
      run();
    },
    stop(){
      stop();
    },
    clear(){
      stop();
      ctx.clearRect(0, 0, canvasModel.width, canvasModel.height);
      canvasModel.particles = [];
    },
    update(){
      rander(canvasModel, 0);
    },
    reform(config){
      // canvas model renewal
      canvasModel.width           = config.width;
      canvasModel.height          = config.height;
      canvasModel.fixPosition();
      canvasModel.initSquare();
      // model configure
      this.width                  = config.width;
      this.height                 = config.height;
      this.style.backgroundImage  = "url(" + config.backgroundImage + ")";
      return this;
    },
    change_viewFilter(type, diseaseName){
      console.log("change_viewFilter:", type, diseaseName);
      viewFilter = type;
      viewFilterDisease = diseaseName;
    },
    change_viewFilter1(diseaseName){
      viewFilter = ('none'== diseaseName.toLowerCase()) ? 'nomal':'spread';
      viewFilterDisease = diseaseName;
    }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  canvasModel                 = new CanvasModel(config.width, config.height);
  ctx                         = this.getContext("2d");
  this.width                  = config.width;
  this.height                 = config.height;
  this.style.backgroundImage  = "url(" + config.backgroundImage + ")";
  state.store('simulator.isRunning', isRunning);

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CanvasMonitorController
};
