/* eslint-disable no-undef */

const Box = function (clazz) {
    //* Describe Tags
    return $SR.generateHtml `
    <div class="datetimepicker-selection-details">
        <div class="datetimepicker-selection-from is-hidden"></div>
        <div class="${clazz}">
            <div class="datetimepicker-selection-wrapper">
                <div class="datetimepicker-selection-day">11</div>
                <div class="datetimepicker-selection-date">
                    <div class="datetimepicker-selection-month">5월 2022</div>
                    <div class="datetimepicker-selection-weekday">수요일</div>
                </div>
            </div>
        </div>
    </div>
    `; // HTML end
}
export {
    Box
};
