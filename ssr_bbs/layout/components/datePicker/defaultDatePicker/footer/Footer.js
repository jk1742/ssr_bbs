/* eslint-disable no-undef */

const Footer = function () {
    //* Describe Tags
    return $SR.generateHtml `
    <div class="datetimepicker-footer" data-id="datepicker-footer">
        <button type="button" class="datetimepicker-footer-validate has-text-success button is-small is-text is-hidden">Validate </button>
        <button type="button" class="datetimepicker-footer-today has-text-warning button is-small is-text">Today</button>
        <button type="button" class="datetimepicker-footer-clear has-text-danger button is-small is-text">Clear</button>
        <button type="button" class="datetimepicker-footer-cancel button is-small is-text ">Close</button>
    </div>
    `; // HTML end
}
export {
    Footer
};
