import { DaysController } from "./body/DaysController";
import { MonthsController } from "./body/MonthsController";
import { YearsController } from "./body/YearsController";
import { LocalDate } from "./class/LocalDate";
import { DummyController } from "./dummy/DummyController";
import { FooterController } from "./footer/FooterController";
import { HeaderController } from "./header/HeaderController";
import { NavController } from "./nav/NavController";

/***
 * DatePickerController
 * @constructor
 ***/
//* Describe DatePickerController Class below
const DatePickerController = function (_datePickerHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const dateRepository  = $SR.Date.getInstance();
  const localDate       = new LocalDate();
  let   dummy           = this.children[0];
  const wrapper         = this.children[1];
  let   header          = this.getModelByDataId('datepicker-header');
  let   datePicker_nav  = this.getModelByDataId('datepicker-nav');
  let   days            = this.getModelByDataId('datepicker-days');
  let   months          = this.getModelByDataId('datepicker-months');
  let   years           = this.getModelByDataId('datepicker-years');
  const footer          = this.getModelByDataId('datepicker-footer');
  const _private        = {
    year    : dateRepository.thisYear,
    month   : dateRepository.thisMonth,
    day     : dateRepository.today,
    mode    : 'single',
    datetype: this.getAttribute('data-datetype')
  }


  //* Privilege Static Functions ////////////////////////////////////////////////
  const get_DatePickerData = () => {
    return {
      year: me.year,
      month: me.month,
      day: me.day
    }
  }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    day: {
      get: () => _private.day,
      set: (o) => { if ('number' === typeof o) _private.day = o },
      enumerable: true, configurable: true
    },
    month: {
      get: () => _private.month,
      set: (o) => { if ('number' === typeof o) _private.month = o },
      enumerable: true, configurable: true
    },
    year: {
      get: () => _private.year,
      set: (o) => { if ('number' === typeof o) _private.year = o },
      enumerable: true, configurable: true
    },
    mode: {
      get: () => _private.mode, enumerable: true
    },
    datetype:{
      get: () => _private.datetype, enumerable: true
    },
    inactive:{
      get: () => dummy.inactive,
      set: (o) => {
        if ('boolean' !== typeof o) {
          console.warn('boolean datatype only');
          return;
        }
        if(o)dummy.setInactive();
        else dummy.setActive();
      },
      enumerable: true, configurable: true
    }
    // pickedDateArray:{
    //   get: () => {
    //     const _carriage = [];
    //     dummy.getArray().forEach(element => {
    //       _carriage.push(dummy.formattedDate(element, me.datetype));
    //       console.log(element, me.datetype);
    //     });
    //     return _carriage;
    //   },
    //   set:(arr) => {
    //     if(!_.isArray(arr)) console.worn('please. check datatype, Date type array only');
    //     const _array = [];
    //     arr.forEach(element => {
    //       _array.push(new Date(element).getTime());
    //     });
    //     console.log(_array);
    //     header.que = _array;
    //     days.que = _array;
    //   },
    //   enumerable: true, configurable:true
    // },
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    onmouseover_btn (_e) {
      console.log('onmouseover_btn');
    },
    load (arr){
      dummy.printDummy(arr);
    },
    stringParseDate: localDate.stringParseDate
  });
  const me           = this;


  //* Event handler /////////////////////////////////////////////////////////////
  // this.onclick = (_e) => {
  //   if ('undefined' !== typeof _datePickerHandler.onclick_th) _datePickerHandler.onclick_th(e, this.id);
  // }


  //* Lazy Initialization ///////////////////////////////////////////////////////
  const mode = me.getAttribute('data-mode');
  _private.mode =  (typeof mode === 'undefined') ? 'single':mode;
  wrapper.classList.add('is-hidden');
  dummy = $SR.registerModel(dummy).inject(DummyController,{
    onclick_dummy() {
      if (dummy.inactive) return;
      wrapper.classList.remove('is-hidden');
      if (me.mode == 'single') {
        header.que = dummy.getArray();
        days.que = dummy.getArray();
        header.generate();
        days.paintSingle();
      }
      if (me.mode != 'range') return;
      header.que = dummy.getArray();
      days.que = dummy.getArray();
      header.generate();
      days.repaintRange();
    },
    onclick_erase() {
      if (dummy.inactive) return;
      days.clear();
      header.clear();
      dummy.clear();
      _.debounce(() => { wrapper.classList.add('is-hidden')},200)();
    },
  }, me.datetype);
  header = $SR.registerModel(header).inject(HeaderController, {}, me.mode);
  datePicker_nav = $SR.registerModel(datePicker_nav).inject(NavController, {
    onclick_navPre(_e) {
      let k = me.month - 1;
      let j = 0;
      if (k < 1) {
        k = 12;
        j = 1;
      }
      const num_month = k;
      const num_year = me.year - j;
      // set increase
      me.month = num_month;
      datePicker_nav.month = num_month;
      me.year = num_year;
      datePicker_nav.year = num_year;
      // generate
      days.generateCalendar(num_year, num_month);
    },
    onclick_navMonth(_e) {
      years.classList.remove('is-active');
      months.classList.add('is-active');
      days.classList.add('is-hidden');
    },
    onclick_navYear(_e) {
      months.classList.remove('is-active');
      days.classList.add('is-hidden');
      years.classList.add('is-active');
    },
    onclick_navNext(_e) {
      let k = me.month + 1;
      let   j = 0;
      if (k > 12) {
        k = 1;
        j = 1;
      }
      const num_month       = k;
      const num_year        = me.year + j;
      // set increase
      me.month              = num_month;
      datePicker_nav.month  = num_month;
      me.year               = num_year;
      datePicker_nav.year   = num_year;
      // generate
      days.generateCalendar(num_year, num_month);
    },
  });
  years = $SR.registerModel(years).inject(YearsController,{
    get_DatePickerData: get_DatePickerData,
    onclick_year(_e, _year){
      const num_year = Number(_year);
      me.year = num_year;
      datePicker_nav.year = num_year;
      days.generateCalendar(_year, me.month);
      years.classList.remove('is-active');
      months.classList.remove('is-active');
      days.classList.remove('is-hidden');
    }
  });
  months = $SR.registerModel(months).inject(MonthsController,{
    get_DatePickerData: get_DatePickerData,
    onclick_month(_e, _month){
      const num_month = Number(_month);
      me.month = num_month;
      datePicker_nav.month = num_month;
      days.generateCalendar(me.year, num_month);
      years.classList.remove('is-active');
      months.classList.remove('is-active');
      days.classList.remove('is-hidden');
    }
  });
  days = $SR.registerModel(days).inject(DaysController,{
    onclick_day (_e, _date) {
      header.que = days.que;
      if (me.mode == 'single') {
        if (days.que.length > 1) {
          days.que.shift();
        }
        header.generate();
        dummy.printDummy(header.que);
      }
      if (me.mode != 'range') return;
      header.generate();
      if (days.que.length == 2){
        days.repaintRange();
        dummy.printDummy(header.que);
      } else if (days.que.length > 2) {
        days.clear();
        header.clear();
      }
    }
  }, me.mode);
  $SR.registerModel(footer).inject(FooterController,{
    onclick_clear(){
      days.clear();
      header.clear();
    },
    onclick_today(){
      me.year = dateRepository.thisYear;
      me.month = dateRepository.thisMonth;
      datePicker_nav.year = dateRepository.thisYear;
      datePicker_nav.month = dateRepository.thisMonth;
      days.generateCalendar(dateRepository.thisYear, dateRepository.thisMonth);
    },
    onclick_cancel(){
      _.debounce(() => { wrapper.classList.add('is-hidden') }, 500)();
    }
  });

  datePicker_nav.month = me.month;
  datePicker_nav.year = me.year;
  days.generateCalendar(me.year, me.month);

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  DatePickerController
};
