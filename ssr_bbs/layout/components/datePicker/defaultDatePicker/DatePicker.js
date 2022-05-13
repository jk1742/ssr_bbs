/* eslint-disable no-undef */
import '/layout/components/datePicker/Calender.css';

// import view block with controller
import { Months } from './body/Months';
import { Years } from './body/Years';
import { Days } from './body/Days';
import { Nav } from './nav/Nav';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
/**
 * DatePicker
 * @param {*} id
 * @param {*} style
 * @param {*} mode
 *  undefined = single, range = range select
 * @returns DocumentObject
 */
const DatePicker = function (id, style, mode) {

    const header    = new Header('calender_header', mode);
    const months    = new Months('calendar_months');
    const years     = new Years('calendar_years');
    const days      = new Days('calendar_days');
    const nav       = new Nav('calendar_nav');
    const footer    = new Footer('calendar_footer');

    //* Describe Tags
    return $SR.generateHtml `
    <div id="${id}" data-mode="${mode}">
        <div class="datetimepicker-dummy is-primary">
            <div class="datetimepicker-dummy-wrapper">
                <input placeholder="" readonly="readonly" class="datetimepicker-dummy-input" type="text" />
                <input id="datepickerDemoDefault" class="input is-hidden" type="text" value="09/25/2018" />
            </div>
            <button class="datetimepicker-clear-button" type="button"> + </button>
        </div>
        <div class="datetimepicker-wrapper">
            <div class="modal-background is-hidden"></div>
            <div class="datetimepicker is-primary is-datetimepicker-default is-active" style="position: absolute;">
                <div class="datetimepicker-container">
                    <!-- header -->
                    ${header.outerHTML}
                    <div class="datepicker is-active">
                        <!-- nav -->
                        ${nav.outerHTML}
                        <div class="datepicker-body">
                            <!-- days -->
                            ${days.outerHTML}
                            <!-- months static-->
                            ${months.outerHTML}
                            <!-- Years static-->
                            ${years.outerHTML}
                        </div>
                    </div>
                </div>
                <!-- footer -->
                ${footer.outerHTML}
            </div>
        </div>
    </div>
    `; // HTML end
}
export {
    DatePicker
};