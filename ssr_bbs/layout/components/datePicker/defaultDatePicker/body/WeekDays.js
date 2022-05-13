/* eslint-disable no-undef */

const WeekDays = function (id) {
    const dom = document.createElement("div");
    dom.classList.add('datepicker-weekdays');
    dom.id = id;
    // paint weekdays
    const dateRepository = $SR.Date.getInstance();
    const weekdays = dateRepository.weekdays;
    for (const iterator of weekdays) {
        const weekday = document.createElement("div");
        weekday.classList.add('datepicker-date');
        weekday.innerText = iterator.short;
        dom.append(weekday);
    }
    return dom;
}
export {
    WeekDays
};
