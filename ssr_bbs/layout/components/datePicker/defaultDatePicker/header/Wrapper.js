/* eslint-disable no-undef */

const Wrapper = function (id) {
    //* Describe Tags
    return $SR.generateHtml `
    <div class="datetimepicker-header is-date-only" id="${id}"></div>
    `; // HTML end
}
export {
    Wrapper
};
