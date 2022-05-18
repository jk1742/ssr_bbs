/* eslint-disable no-undef */
import '/layout/components/datePicker/Calender.css';

// import view block with controller
import { Months } from './body/Months';
import { Years } from './body/Years';
import { Days } from './body/Days';
import { Nav } from './nav/Nav';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { Dummy } from './dummy/Dummy';
import { isNull } from 'lodash';
/**
 * DatePicker
 * @param {*} name
 * @param {*} mode
 *  undefined = single-date, range = range-date
 * @param {*} datetype
 *  date style
 *  yyyy-mm-dd, yyyy/mm/dd, dd-mon-yyyy
 * @param {*} position
 *  below above modal
 * @param {*} color
 *  is-info, is-primary, is-link, is-success, is-warning, is-danger,
 *  is-black-bis, is-black-ter, is-grey-darker, is-grey-dark, is-grey,
 *  is-grey-light, is-grey-lighter, is-white-ter, is-white-bis
 * @returns DocumentObject
 */
const DatePicker = function (name, mode, datetype, position, color) {
    const dummy     = new Dummy(mode);
    const header    = new Header(mode);
    const months    = new Months();
    const years     = new Years();
    const days      = new Days();
    const nav       = new Nav();
    const footer    = new Footer();

    if (isNull(datetype) || 'undefined' === typeof datetype ) datetype = 'yyyy-MM-dd';
    if (isNull(position) || 'undefined' === typeof position) position = 'below';
    if (isNull(color) || 'undefined' === typeof position) color = 'is-primary';

    let writePositionStyle;
    let writePositionClass;
    if (position == 'above') {
        writePositionStyle = 'position: absolute;top: 27%;';
        writePositionClass = 'datetimepicker-container-reverse';
    } else {
        writePositionStyle = 'position: absolute;';
        writePositionClass = 'datetimepicker-container';
    }

    //* Describe Tags
    return $SR.generateHtml `
    <div data-id="${name}" data-mode="${mode}" data-datetype="${datetype}">
        <!-- dummy -->
        ${dummy.outerHTML}
        <div class="datetimepicker-wrapper">
            <div class="modal-background is-hidden"></div>
            <div class="datetimepicker ${color} is-datetimepicker-default is-active" style="${writePositionStyle}">
                <div class="${writePositionClass}">
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