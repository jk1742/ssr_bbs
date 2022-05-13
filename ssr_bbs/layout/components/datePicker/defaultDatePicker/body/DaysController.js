/***
 * DaysController
 * @constructor
 ***/
//* Describe DaysController Class below
const DaysController = function (_daysHandler, mode) {

  //* private variable & mapping ////////////////////////////////////////////////
  const dateRepository = $SR.Date.getInstance();
  let   days = this.children[1];
  const _private = {
    mode: mode,
    que: []
  };
  console.log('days', _private);


  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    que: {
      get: () => _private.que, enumerable:true
    },
  });
  const me           = this;


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    generateCalendar(input_year, input_month) {
      days.innerHTML = null;
      // print pre week
      const firstDay = dateRepository.getFirstDayOfMonth(input_year, input_month);
      const preLimit = dateRepository.getLastDayOfMonth(input_year, input_month - 1);
      const preStart = preLimit.getDate() - firstDay.getDay() + 1;
      for (let index = preStart; index <= preLimit.getDate(); index++) {
        const d = document.createElement("div");
        d.classList.add('datepicker-date');
        d.setAttribute('data-date', new Date(input_year, (input_month - 2), index).getTime());
        const item = document.createElement("button");
        item.classList.add('date-item');
        item.type = 'button';
        item.innerText = index;
        d.append(item);
        days.append(d);
      }
      // print current month days
      const lastDay = dateRepository.getLastDayOfMonth(input_year, input_month);
      for (let index = 1; index <= lastDay.getDate(); index++) {
        const d = document.createElement("div");
        d.classList.add('datepicker-date');
        d.classList.add('is-current-month');
        d.setAttribute('data-date', new Date(input_year, (input_month - 1), index).getTime());
        const item = document.createElement("button");
        item.classList.add('date-item');
        item.type = 'button';
        item.innerText = index;
        if (
          index == dateRepository.today &&
          input_month == dateRepository.thisMonth &&
          input_year == dateRepository.thisYear
        ) {
          d.classList.add('datepicker-range-start');
          item.classList.add('is-today');
          item.classList.add('is-active');
        }
        d.append(item);
        days.append(d);
      }
      // print next week
      const nextLimit = (lastDay.getDay() >= 6) ? 0 : 6 - lastDay.getDay();
      for (let index = 1; index <= nextLimit; index++) {
        const d = document.createElement("div");
        d.classList.add('datepicker-date');
        d.setAttribute('data-date', new Date(input_year, (input_month), index).getTime());
        const item = document.createElement("button");
        item.classList.add('date-item');
        item.type = 'button';
        item.innerText = index;
        d.append(item);
        days.append(d);
      }
      for (const iterator of Array.from(days.children)) {
        iterator.onclick = (e) => {
          const date = Number(iterator.getAttribute('data-date'));
          _private.que.push(date);
          if ('undefined' !== typeof _daysHandler.onclick_day) _daysHandler.onclick_day(e, date);
        }
      }
    },
    paintRange(){
      // erase range painter
      for (const iterator of Array.from(days.children)) {
        iterator.classList.remove('datepicker-range');
        iterator.classList.remove('datepicker-range-start');
        iterator.classList.remove('datepicker-range-end');
        iterator.firstChild.classList.remove('is-active');
      }
      // sort que
      const _que = _private.que;
      _que.sort();
      // start when 2 que
      if (_que.length < 2) return;
      for (const iterator of Array.from(days.children)) {
        const date = Number(iterator.getAttribute('data-date'));
        const from = _que[0];
        const to = _que[1];
        if (from === date) {
          iterator.classList.add('datepicker-range');
          iterator.classList.add('datepicker-range-start');
        } else if (from < date && date < to){
          iterator.classList.add('datepicker-range');
        } else if (to === date) {
          iterator.classList.add('datepicker-range');
          iterator.classList.add('datepicker-range-end');
        }
      }
    },
    clear(){
      _private.que = [];
      for (const iterator of Array.from(days.children)) {
        iterator.classList.remove('datepicker-range');
        iterator.classList.remove('datepicker-range-start');
        iterator.classList.remove('datepicker-range-end');
        iterator.firstChild.classList.remove('is-active');
      }
    }
  });


  //* Event handler /////////////////////////////////////////////////////////////
  // this.onclick = (e) => {
  //   if ('undefined' !== typeof _datePickerHandler.onclick_th) _datePickerHandler.onclick_th(e, this.id);
  // }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  DaysController
};
