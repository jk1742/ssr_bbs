/* eslint-disable no-undef */
import '/layout/components/datePicker/Calender.css';

// import view block with controller
import { WeekDays } from './body/WeekDays';
import { Months } from './body/Months';
import { Years } from './body/Years';


const DatePicker = function (id) {

    const weekDays = new WeekDays('calendar_weekDays');
    const months = new Months('calendar_months');
    const years = new Years('calendar_years');

    //* Describe Tags
    return $SR.generateHtml `
    <div id=${id}>
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
                    <div class="datetimepicker-header is-date-only">
                        <div class="datetimepicker-selection-details">
                            <div class="datetimepicker-selection-from is-hidden"></div>
                            <div class="datetimepicker-selection-start is-centered">
                                <div class="datetimepicker-selection-wrapper">
                                    <div class="datetimepicker-selection-day">11</div>
                                    <div class="datetimepicker-selection-date">
                                        <div class="datetimepicker-selection-month">5월 2022</div>
                                        <div class="datetimepicker-selection-weekday">수요일</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="datepicker is-active">
                        <div class="datepicker-nav">
                            <button type="button" class="datepicker-nav-previous button is-small is-text">
                                <svg viewBox="0 0 50 80" xml:space="preserve">
                                    <polyline fill="none" stroke-width=".5em" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "></polyline>
                                </svg>
                            </button>
                            <div class="datepicker-nav-month-year">
                                <div class="datepicker-nav-month">5월</div>
                                &nbsp;
                                <div class="datepicker-nav-year">2022</div>
                            </div>
                            <button type="button" class="datepicker-nav-next button is-small is-text">
                                <svg viewBox="0 0 50 80" xml:space="preserve">
                                    <polyline fill="none" stroke-width=".5em" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "></polyline>
                                </svg>
                            </button>
                        </div>
                        <div class="datepicker-body">
                            <div class="datepicker-dates is-active">
                                <!-- weekDays -->
                                ${weekDays.outerHTML}
                                <div class="datepicker-days">
                                    <div data-date="Sun May 01 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">1</button>
                                    </div>
                                    <div data-date="Mon May 02 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">2</button>
                                    </div>
                                    <div data-date="Tue May 03 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">3</button>
                                    </div>
                                    <div data-date="Wed May 04 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">4</button>
                                    </div>
                                    <div data-date="Thu May 05 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">5</button>
                                    </div>
                                    <div data-date="Fri May 06 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">6</button>
                                    </div>
                                    <div data-date="Sat May 07 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">7</button>
                                    </div>
                                    <div data-date="Sun May 08 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">8</button>
                                    </div>
                                    <div data-date="Mon May 09 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">9</button>
                                    </div>
                                    <div data-date="Tue May 10 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">10</button>
                                    </div>
                                    <div data-date="Wed May 11 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month datepicker-range-start">
                                        <button class="date-item is-today is-active" type="button">11</button>
                                    </div>
                                    <div data-date="Thu May 12 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">12</button>
                                    </div>
                                    <div data-date="Fri May 13 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">13</button>
                                    </div>
                                    <div data-date="Sat May 14 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">14</button>
                                    </div>
                                    <div data-date="Sun May 15 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">15</button>
                                    </div>
                                    <div data-date="Mon May 16 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">16</button>
                                    </div>
                                    <div data-date="Tue May 17 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">17</button>
                                    </div>
                                    <div data-date="Wed May 18 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">18</button>
                                    </div>
                                    <div data-date="Thu May 19 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">19</button>
                                    </div>
                                    <div data-date="Fri May 20 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">20</button>
                                    </div>
                                    <div data-date="Sat May 21 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">21</button>
                                    </div>
                                    <div data-date="Sun May 22 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">22</button>
                                    </div>
                                    <div data-date="Mon May 23 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">23</button>
                                    </div>
                                    <div data-date="Tue May 24 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">24</button>
                                    </div>
                                    <div data-date="Wed May 25 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">25</button>
                                    </div>
                                    <div data-date="Thu May 26 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">26</button>
                                    </div>
                                    <div data-date="Fri May 27 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">27</button>
                                    </div>
                                    <div data-date="Sat May 28 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">28</button>
                                    </div>
                                    <div data-date="Sun May 29 2022 00:00:00 GMT+0900 (한국 표준시)"
                                        class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">29</button>
                                    </div>
                                    <div data-date="Mon May 30 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">30</button>
                                    </div>
                                    <div data-date="Tue May 31 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date is-current-month">
                                        <button class="date-item" type="button">31</button>
                                    </div>
                                    <div data-date="Wed Jun 01 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date">
                                        <button class="date-item" type="button">1</button>
                                    </div>
                                    <div data-date="Thu Jun 02 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date">
                                        <button class="date-item" type="button">2</button>
                                    </div>
                                    <div data-date="Fri Jun 03 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date">
                                        <button class="date-item" type="button">3</button>
                                    </div>
                                    <div data-date="Sat Jun 04 2022 00:00:00 GMT+0900 (한국 표준시)" class="datepicker-date">
                                        <button class="date-item" type="button">4</button>
                                    </div>
                                </div>
                            </div>
                            <!-- months -->
                            ${months.outerHTML}
                            <!-- Years -->
                            ${years.outerHTML}
                        </div>
                    </div>
                </div>
                <div class="datetimepicker-footer">
                    <button type="button"
                        class="datetimepicker-footer-validate has-text-success button is-small is-text is-hidden">Validate
                    </button>
                    <button type="button"
                        class="datetimepicker-footer-today has-text-warning button is-small is-text">Today</button>
                    <button type="button"
                        class="datetimepicker-footer-clear has-text-danger button is-small is-text">Clear</button>
                    <button type="button" class="datetimepicker-footer-cancel button is-small is-text ">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    `; // HTML end
}
export {
    DatePicker
};