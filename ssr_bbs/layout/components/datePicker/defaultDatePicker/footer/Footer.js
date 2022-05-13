/* eslint-disable no-undef */

const Footer = function (id) {
    //* Describe Tags
    return $SR.generateHtml `
    <div class="datetimepicker-footer" id="${id}">
        <button type="button" class="datetimepicker-footer-today has-text-warning button is-small is-text">Today</button>
        <button type="button" class="datetimepicker-footer-clear has-text-danger button is-small is-text">Clear</button>
        <button type="button" class="datetimepicker-footer-cancel button is-small is-text ">Cancel</button>
    </div>
    `; // HTML end
}
export {
    Footer
};
