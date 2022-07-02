/* eslint-disable no-undef */
const { isNull, isBoolean } = require("lodash");

/*****
  * name  : getBrowser
  * return:   isAndroid, isCordova, isEdge, isFirefox, isChrome, isChromeIOS, isChromiumBased,
              isIE, isIOS, isOpera, isSafari, isTouchScreen, isWebComponentsSupported
  ******/
const getBrowserInfo = function() {
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
}

/* eslint-disable no-unused-vars */
const scrollToSmoothly = function (pos, time) {
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
const getCertifyKey = function() {
   return klp;
 }
const setCertifyKey =  function(o) {
   klp = o;
 }

/*****
 * server stamp
 *****/
let tkCnt = 0;
const stampCnt = function() {
   return tkCnt++;
}

/**
  * isDOM
  * @param {*} obj
  * @returns
  */
const isDOM = function(obj){
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

/**
  * instantIdStamp
  *   Count how many parent nodes to Target
  * @param {*} obj
  * @returns
  */
const instantIdStamp = function(DOM){
  const countToTop = function (target, o) {
    let cnt = 0;
    const fx = function (_target, _o) {
      const node = _o;
      if (!node.tagName) return 'article-child';
      if (node.tagName == _target) return cnt;
      cnt++;
      return fx(_target, node.parentNode);
    }
    return fx(target, o);
  }
  const countToHorizontal = function (o) {
    const array = [...o['parentNode']['children']]
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (o.isSameNode(element)) return index;
    }
  }
  const countFrameByHorizontal = function (o) {
    if (_.isNull(o) || typeof o === 'undefined') return 'F';
    const array = [...o['parentNode']['children']];
    let carriage = 0;
    for (const iterator of array) {
      if (o.isSameNode(iterator)) return carriage;
      if (o.tagName == iterator.tagName) carriage++;
    }
  }
  return _.join([
    Math.floor(new Date().getTime() / 1000).toString(16),
    countFrameByHorizontal(DOM.closest('ARTICLE')),
    countFrameByHorizontal(DOM.closest('SECTION')),
    countToTop('BODY', DOM),
    countToHorizontal(DOM),
    DOM.parentNode.children.length
  ], '-');
}
//module.exports = {
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
  /**
   * Date
   *
   */
  Date: (function () {
    let instance;
    const _DateClass = function () {
      const _private = {
        weekdays  : [],
        months    : [],
        years     : [],
        thisYear  : 0,
        thisMonth : 0,
        today     : 0
      }
      // extract weekdays
      for (let i = 1; i < 8; i++) {
        const init = new Date(Date.UTC(2021, 7, i, 0, 0, 0));
        const date = new Date(init.getTime() + (init.getTimezoneOffset() * 60 * 1000));
        const _o = {};
        _o.short = date.toLocaleString(window.navigator.language, { weekday: 'short' });
        _o.long = date.toLocaleString(window.navigator.language, { weekday: 'long' });
        _private.weekdays.push(_o);
      }
      // extract months
      const getMonths = (i)=>{
        const init = new Date(Date.UTC(2021, i, 0, 0, 0, 0));
        const m = new Date(init.getTime() + (init.getTimezoneOffset() * 60 * 1000));
        const _o = {};
        _o.short = m.toLocaleString(window.navigator.language, { month: 'short' });
        _o.long = m.toLocaleString(window.navigator.language, { month: 'long' });
        return _o;
      }
      for (let i = 1; i < 12; i++) {
        _private.months.push(getMonths(i));
      }
      _private.months.push(getMonths(0));
      // current timestamp
      const timestamp = new Date();
      _private.thisYear = timestamp.getFullYear();
      _private.thisMonth = timestamp.getMonth() + 1;
      _private.today = timestamp.getDate();
      const start_year = _private.thisYear - 50;
      for (let i = 0; i < 99; i++) {
        _private.years.push(start_year + i);
      }
      // set public
      Object.defineProperties(this, {
        weekdays: {
          get: () => _private.weekdays,
          enumerable: true
        },
        months: {
          get: () => _private.months,
          enumerable: true
        },
        years: {
          get: () => _private.years,
          enumerable: true
        },
        thisYear: {
          get: () => _private.thisYear,
          enumerable: true
        },
        thisMonth: {
          get: () => _private.thisMonth,
          enumerable: true
        },
        today:{
          get: () => _private.today,
          enumerable: true
        }
      });
      Object.assign(this, {
        getFirstDayOfMonth(yyyy, m) {
          m = m - 1;
          return new Date(yyyy, m, 1);
        },
        getLastDayOfMonth(yyyy, m) {
          return new Date(yyyy, m, 0);
        }
      });
    }
    return {
      getInstance: function () {
        if (instance == null) {
          instance = new _DateClass();
          instance.constructor = null;
        }
        return instance;
      }
    };
  })(),
   /**
   * Skeleton
   *  load html visual skeleton form css
   */
  Skeleton: (function () {
    let instance;
    const SkeletonClass = function() {
      const skeleton = ['section', '.cont_main', '.frame-top', '.frame-mid', '.frame-btm'];
      const skeletonAttribute = ['margin-top', 'padding-top', 'border-top', 'height', 'border-bottom', 'padding-bottom', 'margin-bottom'];
      let carriage = {};
      let styleTmp = [];
      const pick = (css) => {
        const array = [...css];
        const k = array.filter(e => skeleton.includes(e.selectorText));
        if (k.length > 0) styleTmp = styleTmp.concat(k);
      }
      const find = (name) => {
        return styleTmp.find(e => { return e.selectorText == name });
      }
      const v = [...document.styleSheets];
      v.splice(0, 0, v.splice(1, 1)[0]); //for improving performance
      for (const iterator of v) {
        pick(iterator.cssRules || iterator.rules);
        if (styleTmp.length >= 5) break;
      }
      for (const iterator of skeleton) {
        const name = _.camelCase(iterator.replace(/\.|\#/, ''));
        const r = find(iterator);
        carriage[name] = {};
        for (const inIter of skeletonAttribute) {
          const value = r.style.getPropertyValue(inIter);
          if (!isNull(value) && '' != value) carriage[name][_.camelCase(inIter)] = value;
        }
        const fx = function () {
          const strip = (str)=>{
            const array = str.match(/\d+/g);
            if(array > 0) {
              return Number(array[0]);
            }
            return null;
          }
          Object.assign(this, {
            getIntValue: (str) => {
              if (!isNull(this[str]) && this[str] !== undefined) {
                return strip(this[str]);
              }
              const csStr = _.camelCase(str);
              if (!isNull(this[csStr]) && this[csStr] !== undefined) {
                return strip(this[csStr]);
              }
              return null;
            }
          });
        }
        fx.call(carriage[name]);
      }
      return carriage;
    }
    // return closure
    return {
      getInstance: function () {
        if (instance == null) {
          instance = new SkeletonClass();
          instance.constructor = null;
        }
        return instance;
      }
    };
  })(),
 /***
  * EventCarrier
  *  event type: onEventEmitted
  ***/
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
  /**
   * Article
   * @param {*} dom
   * @returns
   * @variable subject
   * @variable scrollLock
   * @function removeClassArticle
   * @function appendClassArticle
   */
  Article: function(dom) {
    const fx = function () {
      let _private= {
        scrollLock: false,
      };
      const articleCSSIterator = (me, skeleton, fxo)=>{
        const structure = [...me.getElementsByClassName(skeleton)];
        for (const iterator of structure) {
          fxo(iterator);
        }
      }
      Object.defineProperties(this, {
        subject: {
          get: function () {
            let subject;
            let array = [];
            array = this.getElementsByClassName('article-subject');
            if (array.length > 0) {
              return array[0].innerText;
            }
            array = this.getElementsByTagName('h3');
            if (array.length > 0) {
              return array[0].innerText;
            }
            array = this.getElementsByTagName('h2');
            if (array.length > 0) {
              return array[0].innerText;
            }
            array = this.getElementsByTagName('h1');
            if (array.length > 0) {
              return array[0].innerText;
            }
            subject = "There is no subject of article.";
            console.warn("append article error: There is no subject of article.");
            return subject;
          },
          configurable: true
        },
        scrollLock:{
          set: function (boolScrollLock){
            _private.scrollLock = boolScrollLock;
            if (boolScrollLock){
              this.addEventListener('mouseenter', _e => {
                document.childNodes[1].style.overflowY = 'hidden';
                document.body.style.overflowY = 'hidden';
              });
            } else {
              this.addEventListener('mouseenter', _e => {
                document.childNodes[1].style.overflowY = 'scroll';
                document.body.style.overflowY = 'scroll';
              });
            }
          },
          get: () => _private.scrollLock,
          configurable: true
        }
      });
      Object.assign(this, {
        removeCSSArticle(skeleton, target) {
          articleCSSIterator(this, skeleton, (iterator) => {
            if (iterator.classList.contains(target)) iterator.classList.remove(target);
          });
        },
        appendCSSArticle(skeleton, target) {
          articleCSSIterator(this, skeleton, (iterator) => {
            iterator.classList.add(target);
          });
        }
      });
      const scrollLock = dom.getAttribute('data-scroll-lock');
      if (!isNull(scrollLock) && 'true' == scrollLock.toLowerCase()) {
        this.scrollLock = true;
      } else {
        this.scrollLock = false;
      }
    }
    fx.call(dom);
    return dom;
  },
  Section: function (dom, me) {
    const fx = function () {
      let _private = {
      };
      let activities = me.Queue.getInstance();
      Object.assign(this, {
        activate(){
          activities.push({
            id: this.id,
            name: 'moveSection',
            detail: `move to section: ${this.id}`,
            timestamp: Date.now(),
            hash:''
          });
          me.moveScreen(this);
        },
        checkInteractiveDOM(target){
          const _fx = function (_o) {
            const node = _o;
            if (node.isInteractDOM) return node;
            if (node.tagName == 'SECTION' || node.tagName == 'BODY') return null;
            return _fx(node.parentNode);
          }
          return _fx(target);
        },
      });
    }
    fx.call(dom);
    return dom;
  },
  adjustSectionPosition: function (dom) {
    dom.onmouseover = _.debounce(function () {
      // scroll lock
      document.childNodes[1].style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
      dom.style.overflowY = 'hidden';
      // check correct position
      const sections = [...this.getElementsByTagName('section')];
      let secHeight;
      let arrayLoc = [];
      sections.forEach(element => {
        const pos = element.getBoundingClientRect();
        arrayLoc.push(pos.top);
        secHeight = pos.height;
      });
      let needFix = false;
      for (const obj of arrayLoc) {
        const mod_k = obj % secHeight
        if (mod_k != 0) needFix = true;
      }
      if (!needFix) return;
      // adjust position
      let tmp = 0;
      let rc = 0;
      for (let index = 0; index < sections.length; index++) {
        const element = sections[index];
        const k = Math.abs(element.getBoundingClientRect().top);
        if (index == 0) tmp = k;
        if (tmp > k) {
          tmp = k;
          rc = index;
        }
      }
      console.warn('sr: unexpected wheel event occurred - position adjusted');
      const y = sections[rc].getBoundingClientRect().top + window.scrollY
      window.scroll({ top: y, behavior: 'instant' });
    }, 600);
  },
  /**
   * generate Id and ready to inject controller
   * @param {*} documentObject
   * @param {boolean} hasFixedId
   * @returns
   */
  registerModel: function (documentObject, hasFixedId) {
    // DOM check
    let dom = documentObject;
    if (!isDOM(documentObject)) console.error(`Instance error: ${typeof documentObject} is not a DOM object`);
    const ssr = this;
    const fx = function () {
      // variables
      let name;
      // private
      let _private = {
        hasFixedId        : (_.isBoolean(hasFixedId) && hasFixedId),
        hasController     : '',
        parentSectionId   : '',
        parentArticleId   : '',
        isInteractDOM     : false,
        interactiveAction : ()=> null,
        dataToken         : ()=> null,
      };
      // private functions
      const getParentId = function (target, o) {
        const _fx = function (_target, _o) {
          const node = _o;
          if (!node) return '';
          if (node.tagName == _target) return node.id;
          return _fx(_target, node.parentNode);
        }
        return _fx(target, o);
      }
      // access control
      Object.defineProperties(this, {
        hasController: {
          get: function () {
            return _private.hasController;
          },
          configurable: true,
        },
        parentSectionId: {
          set: function (p) {
            _private.parentSectionId = p;
          },
          get: function () {
            return _private.parentSectionId;
          },
          configurable: true,
        },
        parentArticleId: {
          set: function (p) {
              _private.parentArticleId = p;
          },
          get: function () {
            return _private.parentArticleId;
          },
          configurable: true,
        },
        isInteractDOM:{
          get:() => _private.isInteractDOM,
          set: function (p) {
            _private.isInteractDOM = p;
          },
          configurable: true,
        },
        dataToken:{
          get:()=> _private.dataToken,
          configurable: true,
        }
      });
      // public function
      Object.assign(this, {
        inject: function (Controller, Handler) {
          // double inject check
          if (this.hasController !== '') console.warn(`Instance inject error: There was already injected ${this.hasController};Controller is able to inject once`);
          // transfer params
          let args = Array.from(arguments);
          args.splice(0, 2);
          // marge controller & view
          //  - register Controller
          _private.hasController = Controller.name;
          return (function (_dom, _handler, ...Args) {
            return Controller.call(_dom, _handler, ...Args);
          })(this, Handler, ...args);
        },
        setTooltip: function (msg, outline, color, opacity, width, height) {
          const toolTipEvent = ssr.Event.register('ToolTipEvent');
          const t = this.getBoundingClientRect();
          this.onmouseenter = (e) => {
            console.log('setTooltip onmouseenter', e)
            toolTipEvent.emit({
              id: this.id,
              name: 'onmouseenter',
              detail: `mouse entered: ${this.id}`,
              timestamp: Date.now(),
              hash: '',
              tip: {
                msg: msg,
                outline: outline,
                color: color,
                opacity: opacity,
                width: width,
                height: height,
                position: {
                  left: t.left,
                  top: t.top,
                  width: t.width,
                  height: t.height,
                  pageX: e.pageX,
                  pageY: e.pageY,
                }
              }
            });
          }
          this.onmouseleave = (_e) => {
            toolTipEvent.emit({
              id: this.id,
              name: 'onmouseleave',
              detail: `mouse entered: ${this.id}`,
              timestamp: Date.now(),
              hash: ''
            });
          }
          return this;
        },
        run: (runFx) => {
          runFx(this);
          return this;
        },
        setInteractive:(_fxo)=>{
          this.isInteractDOM = true;
          if (_fxo !== null) _private.interactiveAction = _fxo;
          return this;
        },
        launchInteractive:()=>{
          _private.interactiveAction(this);
          return this;
        },
        getData(controllerName){
          const getParent = function (target, o) {
            let cnt = 0;
            const _fx = function (_target, _o) {
              const node = _o;
              if (node.tagName == 'ARTICLE') return undefined;
              if (node.hasController == _target) return node.dataToken;
              cnt++;
              return _fx(_target, node.parentNode);
            }
            return _fx(target, o);
          }
          const _data = getParent(controllerName, this);
          if(typeof _data == 'undefined') return;
          return _data;
        },
        setData(_fx) {
          const carriage = {};
          const _tmp = _fx();
          const checkDepth = (obj) => {
            let c = true;
            for (const key in obj) {
              if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                if (Array.isArray(element) || 'object' === typeof element) {
                  c = false;
                  console.warn('Data transfer object is Not allow deep depth');
                } else if ('function' === typeof element) {
                  c = false;
                  console.warn('Data transfer object is Not allow function');
                }
              }
            }
            return c;
          }
          Object.getOwnPropertyNames(_tmp).forEach(
            function (val) {
              if ('function' === typeof _tmp[val]) {
                console.warn('Data transfer object is Not allow function');
                return;
              }
              if (Array.isArray(_tmp[val]) || 'object' === typeof _tmp[val]) {
                const _obj = _tmp[val];
                if (!checkDepth(_obj)) return;
              }
              carriage[val] = _tmp[val];
            }
          );
          _private.dataToken = carriage;
        },
        getModelByDataClass(_name) {
          return this.querySelectorAll(`[data-class="${_name}"]`);
        },
        getModelById(_name) {
          return this.querySelectorAll(`[data-id="${_name}"]`)[0];
        }
      });
      // new id set
      if (!_private.hasFixedId) {
        const className = this.getAttribute('data-id');
        if (!isNull(className) && 'undefined' != typeof className) name = className.toLowerCase();
        else if (this.id != '') name = this.id;
        else name = this.tagName.toLowerCase();
        this.id = name + '-' + instantIdStamp(this);
      }
      // get section-id
      this.parentSectionId = getParentId('SECTION', this);
      this.parentArticleId = getParentId('ARTICLE', this);
    }
    fx.call(dom);
    return dom;
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
  /***
   * core : registerFrameById
   * return: html object with functions
   * const model = (dom, handler) => Controller.call(dom, handler);
   * dom = model(dom,{});
   ***/
  registerFrameById: function (id) {
    let dom = document.getElementById(id);
    let _private = {
      hasController: '',
      dataToken: () => null,
    };
    Object.defineProperties(dom, {
      hasController: {
        get: function () {
          return _private.hasController;
        },
        configurable: true,
      },
      dataToken: {
        get: () => _private.dataToken
      }
    });
    const tagName = dom.tagName.toLowerCase();
    if ('article' == tagName) this.Article(dom);
    if ('section' == tagName || 'header' == tagName || 'footer' == tagName) this.Section(dom, this);
    Object.assign(dom, {
      inject: function (Controller, Handler) {
        // double inject check
        if (dom.hasController !== '') console.warn(`Instance inject error: There was already injected ${dom.hasController};Controller is able to inject Frame once`);
        // transfer params
        let args = Array.from(arguments);
        args.splice(0, 2);
        // marge controller & view
        //  - register Controller
        _private.hasController = Controller.name;
        return (function (_dom, _Handler, ...Args) {
          return Controller.call(_dom, _Handler, ...Args);
        })(dom, Handler, ...args);
      },
      setData(_fx) {
        const carriage = {};
        const _tmp = _fx();
        const checkDepth = (obj) => {
          let c = true;
          for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
              const element = obj[key];
              if (Array.isArray(element) || 'object' === typeof element ) {
                c = false;
                console.warn('Frame(ARTICLE, SECTION) model data transfer object is Not allow deep depth');
              } else if ('function' === typeof element){
                c = false;
                console.warn('Frame(ARTICLE, SECTION) model data transfer object is Not allow function');
              }
            }
          }
          return c;
        }
        Object.getOwnPropertyNames(_tmp).forEach(
          (val) => {
            if ('function' === typeof _tmp[val]) {
              console.warn('Data transfer object is Not allow function');
              return;
            }
            if (Array.isArray(_tmp[val]) || 'object' === typeof _tmp[val]) {
              const _obj = _tmp[val];
              if (!checkDepth(_obj)) return;
            }
            carriage[val] = _tmp[val];
          }
        );
        _private.dataToken = carriage;
      },
      getModelById(_name) {
        return this.querySelectorAll(`[data-id="${_name}"]`)[0];
      },
      getModelByDataClass(_name) {
        return this.querySelectorAll(`[data-class="${_name}"]`);
      },
    });
    return dom;
  },
  moveTo:function(loc){
    if (browser.isChrome || browser.isEdge) {
      window.scroll({ top: loc, behavior: 'smooth' });
    } else scrollToSmoothly(loc, 1000);
  },
  moveScreen:function(dom){
    const y = dom.getBoundingClientRect().top + window.scrollY;
    const browser = this.getBrowserInfo();
    if (browser.isChrome || browser.isEdge){
      window.scroll({ top: y, behavior: 'smooth' });
    } else scrollToSmoothly(y,1000);
  },
  moveScreen_bak: function(dom){
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
  getBrowserInfo: () => getBrowserInfo(),
};
