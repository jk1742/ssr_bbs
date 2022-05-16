/* eslint-disable no-undef */

const Range = function () {
    //* Describe Tags
    return $SR.generateHtml `
    <div class="datetimepicker-dummy-wrapper">
        <input placeholder="" readonly="readonly" class="datetimepicker-dummy-input is-datetimepicker-range" type="text">
        <input placeholder="" readonly="readonly" class="datetimepicker-dummy-input" type="text">
    </div>
    `; // HTML end
}
export {
    Range
};
