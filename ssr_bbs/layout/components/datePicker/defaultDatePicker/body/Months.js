/* eslint-disable no-undef */

const Months = function (id) {
    const dateRepository = $SR.Date.getInstance();
    // set carriage
    const carriage = document.createElement("DIV");
    carriage.id = id;
    carriage.classList.add('datepicker-months');
    // fabric Month
    const months = dateRepository.months;
    for (let index = 0; index < months.length; index++) {
        const element = months[index];
        const m = document.createElement("div");
        m.classList.add('datepicker-month');
        m.setAttribute('data-month', index + 1);
        if (dateRepository.thisMonth == index + 1) m.classList.add('is-active');
        m.innerText = element.short;
        carriage.append(m);
    }
    return carriage;
}
export {
    Months
};
