/* eslint-disable no-undef */
import { WeekDays } from './WeekDays';

const Days = function (id) {
    //* Describe Tags
    const weekDays = new WeekDays('calendar_weekDays');

    return $SR.generateHtml `
    <div id="${id}" class="datepicker-dates is-active">
        <!-- weekDays static-->
        ${weekDays.outerHTML}
        <div class="datepicker-days"></div>
    </div>
    `; // HTML end
}
export {
    Days
};
