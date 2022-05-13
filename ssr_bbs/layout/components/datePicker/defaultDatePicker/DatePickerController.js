import { DaysController } from "./body/DaysController";
import { MonthsController } from "./body/MonthsController";
import { YearsController } from "./body/YearsController";
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
  const dateRepository = $SR.Date.getInstance();
  let years = document.getElementById('calendar_years');
  let months = document.getElementById('calendar_months');
  let days = document.getElementById('calendar_days');

  const inputDummy      = this.children[0];
  const container       = this.children[1].children[1].firstChild;
  const footer          = this.children[1].children[1].children[1];
  let   header          = container.children[0];
  const datePicker      = container.children[1];
  let   datePicker_nav  = datePicker.children[0];
  const datePicker_body = datePicker.children[1];
  const _private = {
    year  : dateRepository.thisYear,
    month : dateRepository.thisMonth,
    day   : dateRepository.today,
    mode  : 'single'
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
    }
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // onmouseover_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  });
  const me           = this;


  //* Event handler /////////////////////////////////////////////////////////////
  // this.onclick = (e) => {
  //   if ('undefined' !== typeof _datePickerHandler.onclick_th) _datePickerHandler.onclick_th(e, this.id);
  // }


  //* Lazy Initialization ///////////////////////////////////////////////////////
  const mode = me.getAttribute('data-mode')
  _private.mode =  (typeof mode === 'undefined') ? 'single':mode;
  header = $SR.registerModel(header).inject(HeaderController, {}, me.mode);
  datePicker_nav = $SR.registerModel(datePicker_nav).inject(NavController, {
    onclick_navPre(e) {
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
    onclick_navMonth(e) {
      months.style.display = 'flex';
      years.style.display = 'none';
      days.style.display = 'none';
    },
    onclick_navYear(e) {
      months.style.display = 'none';
      years.style.display = 'flex';
      days.style.display = 'none';
    },
    onclick_navNext(e) {
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
    onclick_year(e, _year){
      const num_year = Number(_year);
      me.year = num_year;
      datePicker_nav.year = num_year;
      days.generateCalendar(_year, me.month);
      months.style.display = 'none';
      years.style.display = 'none';
      days.style.display = 'flex';
    }
  });
  months = $SR.registerModel(months).inject(MonthsController,{
    get_DatePickerData: get_DatePickerData,
    onclick_month(e, _month){
      const num_month = Number(_month);
      me.month = num_month;
      datePicker_nav.month = num_month;
      days.generateCalendar(me.year, num_month);
      months.style.display = 'none';
      years.style.display = 'none';
      days.style.display = 'flex';
    }
  });
  days = $SR.registerModel(days).inject(DaysController,{
    onclick_day (e, _date) {
      header.push(Number(_date));
      header.generate();
      console.log('DatePickerController/', _date, header.length);
    }
  }, me.mode);
  $SR.registerModel(footer).inject(FooterController,{
    onclick_clear(){
      days.clear();
      header.clear();
    },
    onclick_today(){
      days.paintRange();
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
