/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function scrollToSmoothly(pos, time) {
  var currentPos = window.pageYOffset;
  var start = null;
  if(time == null) time = 500;
  pos = +pos;
  time = +time;
  window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      var progress = currentTime - start;
      if (currentPos < pos) {
          window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
      } else {
          window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
      }
      if (progress < time) {
          window.requestAnimationFrame(step);
      } else {
          window.scrollTo(0, pos);
      }
  });
}
/*****
 * security policy
 *****/
 let klp;
 function getCertifyKey() {
   return klp;
 }
 function setCertifyKey(o) {
   klp = o;
 }
/*****
 * server stamp
 *****/
 let tkCnt = 0;
 function stampCnt() {
   return tkCnt++;
 }

/**
  * isDOM
  * @param {*} obj 
  * @returns 
  */
function isDOM(obj){
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  }
  catch (e) {
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj === "object") &&
      (obj.nodeType === 1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument === "object");
  }
}

module.exports = {
  uuidv4: function() {
    let ieSupporter = function(ie, mo, obj) {
      var agent = navigator.userAgent.toLowerCase()
      if ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || (agent.indexOf('msie') !== -1)) {
        return ie(obj)
      } else {
        return mo(obj)
      }
    }
    return ieSupporter(function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        // test ? expression1 : expression2
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }, function() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
        c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    })
  },
  getRandomIntInclusive: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
  CurrentTime: function () {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${hours}:${minutes}:${seconds}`
  },
  sleep: function(delay) {
     const start = new Date().getTime();
     while (new Date().getTime() < start + delay);
  },
  EventCarrier: (function(){
    let   instance = {};
    const SingletonEventClass = function() {
      let   carriage  = new DocumentFragment();
      let   data      = {};
      Object.defineProperties(carriage, {
        onEventEmitted: {
          set: function(fx) {
            carriage.addEventListener('onEventEmitted', e => fx(e));
          },
          configurable: true,
        }
      });
      Object.assign(carriage, {
        emit(name, obj){
          data[name] = JSON.stringify(obj);
          carriage.dispatchEvent(new CustomEvent('onEventEmitted', { bubbles: true, detail: {
            getEventName: () => name,
            getContent: () => JSON.parse(data[name])
           }}));
        },
        recall(name){
          return JSON.parse(data[name]);
        },
        getEmitNamesList(){
          return data;
        }

      });
      return carriage;
    }
    // return closure
    return {
      getInstance: function(name){
        if (instance[name] == null) {
          instance[name] = new SingletonEventClass(name);
          instance.constructor = null;
        }
        return instance[name];
      }
    };
  })(),
  VolatileState: (function(){
    let   instance;
    const StateClass = function(_sw) {
      let   carriage  = new DocumentFragment();
      let   data      = {};
      Object.defineProperties(carriage, {
        onStateChanged: {
          set: function(fx) {
            carriage.addEventListener('onStateChanged', e => fx(e));
          },
          configurable: true,
        }
      });
      Object.assign(carriage, {
        store(name, obj){
          data[name] = JSON.stringify(obj);
          carriage.dispatchEvent(new CustomEvent('onStateChanged', { bubbles: true, detail: { getRecordName: () => name } }));
        },
        call(name){
          return JSON.parse(data[name]);
        }
      });
      return carriage;
    }
    // return closure
    return {
      getInstance: function(){
        if (instance == null) {
          instance = new StateClass();
          instance.constructor = null;
        }
        return instance;
      }
    };
  })(),
  Store: (function(){
    let   instance;
    const GLOBAL      = 'GLOBAL';
    const StoreClass = function(_sw) {
      let   carriage  = new DocumentFragment();
      let   setGlobal = false;
      Object.defineProperties(carriage, {
        onStoreItemAppended: {
          set: function(fx) {
            if(setGlobal) window.addEventListener('onStoreItemAppended', e => fx(e));
            else carriage.addEventListener('onStoreItemAppended', e => fx(e));
          },
          configurable: true,
        },
        setGlobal: {
          set: function(o) {
            setGlobal= o;
          },
          get: () => setGlobal,
          configurable: true,
        }
      });
      Object.assign(carriage, {
        append(name, obj){
          if(setGlobal){
            localStorage.setItem(GLOBAL + '$' + name, JSON.stringify(obj));
            window.dispatchEvent(new CustomEvent('onStoreItemAppended', { bubbles: true, detail: { text: () => name } }));
          } else {
            localStorage.setItem('LOCAL$' + name, JSON.stringify(obj));
            carriage.dispatchEvent(new CustomEvent('onStoreItemAppended', { bubbles: true, detail: { text: () => name } }));
          }
        },
        call(name){
          if(setGlobal){
            return JSON.parse(localStorage.getItem(GLOBAL + '$' + name));
          } else {
            return JSON.parse(localStorage.getItem('LOCAL$' + name));
          }
        }
      });
      return carriage;
    }
    // return closure
    return {
      getInstance: function(_global){
        if (instance == null) {
          instance = new StoreClass();
          if('undefined' !== typeof _global) instance.setGlobal = (_global.toUpperCase() === GLOBAL);
          localStorage.clear();
          instance.constructor = null;
        }
        if('undefined' !== typeof _global) instance.setGlobal = (_global.toUpperCase() === GLOBAL);
        return instance;
      }
    };
  })(),
  /**
   * Event
   *  @summary Customized User Event Controller
   *  @function emit: emitting Event
   *  @function figure: figure Event Object
   *  @detail getName, getMessage
   *  * set listener => 'on + eventName'
   */
  Event: (function () {
    let instance = {};
    const StateClass = function (name) {
      let carriage = new DocumentFragment();
      let data = {};
      const eventName = 'on' + name;
      Object.defineProperty(carriage, eventName, {
        set: function (fx) {
          carriage.addEventListener(eventName, e => fx(e));
        },
        configurable: true
      });
      Object.assign(carriage, {
        emit(obj) {
          data[name] = JSON.stringify(obj);
          carriage.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true,
            detail: {
              getName: () => name,
              getMessage: () => obj
            }
          }));
        },
        figure() {
          return JSON.parse(data[name]);
        }
      });
      return carriage;
    }
    return {
      register: function (name) {
        if (instance[name] == null) {
          instance[name] = new StateClass(name);
          instance.constructor = null;
        }
        return instance[name];
      }
    };
  })(),
  /**
   * Queue store
   *  event type: onQueuePush, onQueueCursorMoved
   */
  Queue: (function () {
    let instance;
    const QueueClass = function () {
      let carriage = new DocumentFragment();
      let _private = {};
      _private.index = 0;
      _private.name = 'Queue';
      _private.queue = [];
      const objCall = () => {
        return {
          getName: () => _private.name,
          getMessage: () => _private.queue[(_private.queue.length - 1)]
        }
      }
      const pushEvent = () => new CustomEvent('onQueuePush', { bubbles: true, detail: objCall() });
      const movedEvent = () => new CustomEvent('onQueueCursorMoved', { bubbles: true, detail: objCall() });

      Object.defineProperties(carriage, {
        onQueuePush: {
          set: function (fx) {
            carriage.addEventListener('onQueuePush', e => fx(e));
          },
          configurable: true,
        },
        onQueueCursorMoved: {
          set: function (fx) {
            carriage.addEventListener('onQueueCursorMoved', e => fx(e));
          },
          configurable: true,
        },
        name: {
          set: function (o) {
            _private.name = o;
          },
          get: () => _private.name,
          configurable: true,
        }
      });
      Object.assign(carriage, {
        push(obj) {
          _private.queue.push(obj);
          _private.index = _private.queue.length - 1;
          localStorage.setItem('LOCAL$' + _private.name, JSON.stringify(_private));
          carriage.dispatchEvent(pushEvent());
        },
        clear() {
          _private.queue = [];
          _private.index = 0;
          localStorage.clear();
        },
        cursor() {
          return _private.queue[_private.index];
        },
        beforeCursor() {
          let pos = _private.index;
          pos -= 1;
          pos = (0 > pos) ? 0 : pos;
          return _private.queue[pos];
        },
        goNext() {
          if (0 > _private.index) _private.index = 0;
          _private.index += 1;
          localStorage.setItem('LOCAL$' + _private.name, JSON.stringify(_private));
          carriage.dispatchEvent(movedEvent());
          return (_private.queue !== null && _private.index < _private.queue.length) ? { value: _private.queue[_private.index], done: false } : { done: true };
        },
        goBack() {
          if (_private.queue.length - 1 < _private.index) _private.index = _private.queue.length - 1;
          _private.index -= 1;
          localStorage.setItem('LOCAL$' + _private.name, JSON.stringify(_private));
          carriage.dispatchEvent(movedEvent());
          return (_private.queue !== null && 0 <= _private.index) ? { value: _private.queue[_private.index], done: false } : { done: true };
        }
      });
      return carriage;
    }
    // return closure
    return {
      getInstance: function () {
        if (instance == null) {
          instance = new QueueClass('Queue');
          instance.constructor = null;
          localStorage.clear();
        }
        return instance;
      }
    };
  })(),
  /**
   * History
   */
  History: (function(){
    let   instance;
    const HistoryClass = function() {
      let   carriage      = new DocumentFragment();
      let   _private      = {};
      _private.index      = 0;
      _private.name       = 'history';
      _private.history    = [];
      Object.defineProperties(carriage, {
        onHistoryItemAppended: {
          set: function(fx) {
            carriage.addEventListener('onHistoryItemAppended', e => fx(e));
          },
          configurable: true,
        },
        onHistoryCursorMoved: {
          set: function(fx) {
            carriage.addEventListener('onHistoryCursorMoved', e => fx(e));
          },
          configurable: true,
        },
        name: {
          set: function(o) {
            _private.name= o;
          },
          get: () => _private.name,
          configurable: true,
        }
      });
      Object.assign(carriage, {
        append(obj){
          _private.history.push(obj);
          _private.index = _private.history.length -1;
          window.history.pushState({page: obj}, obj + "page", obj);
          localStorage.setItem('LOCAL$' + _private.name, JSON.stringify(_private));
          carriage.dispatchEvent(new CustomEvent('onHistoryItemAppended', { bubbles: true, detail: { text: () => name } }));
          carriage.dispatchEvent(new CustomEvent('onHistoryCursorMoved', { bubbles: true, detail: { text: () => name } }));
        },
        clear(){
          _private.history = [];
          _private.index = 0;
          localStorage.clear();
        },
        cur(){
          return _private.history[_private.index];
        },
        before(){
          let pos = _private.index;
          pos -= 1;
          pos = (0 > pos) ? 0 : pos;
          return _private.history[pos];
        },
        goNext(){
          if (0 > _private.index) _private.index = 0;
          _private.index += 1;
          localStorage.setItem('LOCAL$' + _private.name, JSON.stringify(_private));
          carriage.dispatchEvent(new CustomEvent('onHistoryCursorMoved', { bubbles: true, detail: { text: () => name } }));
          return (_private.history !== null && _private.index < _private.history.length) ? {value: _private.history[_private.index], done: false} : {done: true};
        },
        goPre(){
          if (_private.history.length-1 < _private.index) _private.index = _private.history.length-1;
          _private.index -= 1;
          localStorage.setItem('LOCAL$' + _private.name, JSON.stringify(_private));
          carriage.dispatchEvent(new CustomEvent('onHistoryCursorMoved', { bubbles: true, detail: { text: () => name } }));
          return (_private.history !== null &&  0 <= _private.index) ? {value: _private.history[_private.index], done: false} : {done: true};
        }
      });
      return carriage;
    }
    // return closure
    return {
      getInstance: function(name){
        if (instance == null) {
          instance = new HistoryClass();
          if ('undefined' !== typeof name) instance = name;
          localStorage.clear();
          instance.constructor = null;
        }
        if ('undefined' !== typeof name) instance = name;
        return instance;
      }
    };
  })(),
 /*****
  * core : generateHtml
  * return: html object
  * convert text to HTML object
  ******/
  generateHtml: function (strings,...template) {
    let a, c, text;
    let array  = [];
    if (Array.isArray(strings)) {
      text = strings.reduce((result, str, i) => (result + template[i-1]  + str));
    } else text = strings;
    a = text.split(/\r?\n/);
    a.forEach(e => {
      if (e.length > 0) array.push(e.trim());
    });
    c = array.reduce((result, str) => (result + str));
    return new DOMParser().parseFromString(c, "text/html").body.firstChild;
  },

 /*****
  * core : marge view and controller
  * return: html object with functions
  * const model = (dom, handler) => Controller.call(dom, handler);
  * dom = model(dom,{});
  ******/
  marge: function (Controller, Dom, Handler){
    return (function(_Dom, _Handler){
      return Controller.call(_Dom, _Handler);
    })(Dom, Handler);
  },
  /**
   * isElement
   * @param {*} obj 
   * @returns 
   */
  isDOM: (obj) => {
    return isDOM(obj);
  },
  /*****
   * core : DOMCall
   * inject controller to Dom object
   ******/
  DOMCall: function (documentObject) {
    let dom = documentObject;
    if (isDOM(documentObject)) console.warn(`Instance error: ${typeof documentObject} is not a DOM object`);
    let hasController = '';
    Object.defineProperties(dom, {
      hasController: {
        get: function () {
          return hasController;
        },
        configurable: true,
      }
    });
    Object.assign(dom, {
      inject: function (Controller, Handler) {
        // double inject check
        if (dom.hasController !== '') console.warn(`Instance inject error: There was already injected ${dom.hasController};Controller is able to inject once`);
        // transfer params
        let args = Array.from(arguments);
        args.splice(0, 2);
        // marge controller & view
        //  - register Controller
        hasController = Controller.name;
        return (function (_dom, _handler, ...Args) {
          return Controller.call(_dom, _handler, ...Args);
        })(dom, Handler, ...args);
      },
    });
    return dom;
  },
 /*****
  * core : View
  * return: html object with functions
  * const model = (dom, handler) => Controller.call(dom, handler);
  * dom = model(dom,{});
  ******/
  View: function(id){
    let dom           = document.getElementById(id);
    let hasController  = '';
    Object.defineProperties(dom, {
      hasController: {
        get: function() {
          return hasController;
        },
        configurable: true,
      }
    });
    Object.assign(dom, {
      inject: function (Controller, Handler){
        // double inject check
        if(dom.hasController !== '') console.warn(`Instance inject error: There was already injected ${dom.hasController};Controller is able to inject once`);
        // transfer params
        let args  = Array.from(arguments);
        args.splice(0, 2);
        // marge controller & view
        //  - register Controller
        hasController = Controller.name;
        return (function (_dom, _Handler, ...Args){
          return Controller.call(_dom, _Handler, ...Args);
        })(dom, Handler, ...args);
      },
    });
    return dom;
  },
  moveTo:function(loc){
    if (browser.isChrome || browser.isEdge) {
      window.scroll({ top: loc, behavior: 'smooth' });
    } else scrollToSmoothly(loc, 1000);
  },
  moveScreen_bak:function(dom){
    const y = dom.getBoundingClientRect().top + window.scrollY;
    const browser = this.getBrowserInfo();
    if (browser.isChrome || browser.isEdge){
      window.scroll({ top: y, behavior: 'smooth' });
    } else scrollToSmoothly(y,1000);
  },
  moveScreen: function(dom){
    const y = dom.getBoundingClientRect().top + window.scrollY;
    const browser = this.getBrowserInfo();
    axios({
      method          : 'post',
      //url             : 'http://synthesis-intellect.com:9000/contact',
      url             : 'http://localhost:9000/contact',
      withCredentials : true,
      params          : { location: dom.id, date: Date.now(), stampCnt: stampCnt(), token:getCertifyKey() }
    }).then((Response)=>{
      // console.log('Response',Response.data); http://192.168.0.6/
      setCertifyKey(Response.data.content);
    }).catch((_Error)=>{
      let elements = document.getElementsByTagName('body')[0];
      elements.innerHTML = `
      <div style="height:95vh;width:100%;">
        <div class="display-table-container" style="padding-top: 5vh;">
          <div class="display-table-middle">
            <div class="display-table-box" style="text-align: center;">
              <h2>Connection Lost</h2>
              <h4>No response form server. Please, Reconnect</h4>
              <button class="outline-button outline-button-gray" onClick="window.location.reload()">connect</button>
            </div>
          </div>
        </div>
      </div>
      `;
    });
    if (browser.isChrome || browser.isEdge){
      window.scroll({ top: y, behavior: 'smooth' });
    } else scrollToSmoothly(y,1000);
  },
 /*****
  * name  : getBrowser
  * return:   isAndroid, isCordova, isEdge, isFirefox, isChrome, isChromeIOS, isChromiumBased,
              isIE, isIOS, isOpera, isSafari, isTouchScreen, isWebComponentsSupported
  ******/
  getBrowserInfo: function(){
    return {
      isAndroid: /Android/.test(navigator.userAgent),
      isCordova: !!window.cordova,
      isEdge: /Edge/.test(navigator.userAgent),
      isFirefox: /Firefox/.test(navigator.userAgent),
      isChrome: /Google Inc/.test(navigator.vendor),
      isChromeIOS: /CriOS/.test(navigator.userAgent),
      isChromiumBased: !!window.chrome && !/Edge/.test(navigator.userAgent),
      isIE: /Trident/.test(navigator.userAgent),
      isIOS: /(iPhone|iPad|iPod)/.test(navigator.platform),
      isOpera: /OPR/.test(navigator.userAgent),
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      isTouchScreen: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
      isWebComponentsSupported: 'registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template')
    };
  },
};
