/* eslint-disable no-undef */

const Years = function (id) {

    const dateRepository = $SR.Date.getInstance();
    const years = dateRepository.years;
    // set carriage
    const carriage = document.createElement("DIV");
    carriage.id = id;
    carriage.classList.add('datepicker-years');
    // generate year
    for (const i of years) {
        const y = document.createElement("DIV");
        y.classList.add('datepicker-year');
        y.setAttribute('data-year', i);
        if (dateRepository.thisYear == i) y.classList.add('is-active');
        const item = document.createElement("SPAN");
        item.classList.add('item');
        item.innerText = i;
        y.append(item);
        carriage.append(y);
    }
    return carriage;
}
export {
    Years
};
