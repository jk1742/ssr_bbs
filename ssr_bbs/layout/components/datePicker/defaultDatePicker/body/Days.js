/* eslint-disable no-undef */
import { WeekDays } from './WeekDays';

const Days = function () {

    //* Describe Tags
    const weekDays = new WeekDays('calendar_weekDays');

    return $SR.generateHtml `
    <div class="datepicker-dates is-active" data-id="datepicker-days">
        <!-- weekDays static-->
        ${weekDays.outerHTML}
        <div class="datepicker-days"></div>
    </div>
    `; // HTML end
}
export {
    Days
};
