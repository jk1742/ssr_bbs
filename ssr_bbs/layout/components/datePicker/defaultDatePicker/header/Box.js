/* eslint-disable no-undef */

const Box = function (clazz) {
    //* Describe Tags
    return $SR.generateHtml `
    <div class="datetimepicker-selection-details">
        <div class="datetimepicker-selection-from is-hidden"></div>
        <div class="${clazz}">
            <div class="datetimepicker-selection-wrapper">
                <div class="datetimepicker-selection-day"></div>
                <div class="datetimepicker-selection-date">
                    <div class="datetimepicker-selection-month"></div>
                    <div class="datetimepicker-selection-weekday"></div>
                </div>
            </div>
        </div>
    </div>
    `; // HTML end
}
export {
    Box
};
