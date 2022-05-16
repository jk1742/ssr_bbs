/* eslint-disable no-undef */

const Nav = function () {
    //* Describe Tags
    return $SR.generateHtml `
    <div class="datepicker-nav" data-id="datepicker-nav">
        <button type="button" class="datepicker-nav-previous button is-small is-text">
            <svg viewBox="0 0 50 80" xml:space="preserve">
                <polyline fill="none" stroke-width=".5em" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "></polyline>
            </svg>
        </button>
        <div class="datepicker-nav-month-year">
            <div class="datepicker-nav-month"></div>
            &nbsp;
            <div class="datepicker-nav-year"></div>
        </div>
        <button type="button" class="datepicker-nav-next button is-small is-text">
            <svg viewBox="0 0 50 80" xml:space="preserve">
                <polyline fill="none" stroke-width=".5em" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "></polyline>
            </svg>
        </button>
    </div>
    `; // HTML end
}
export {
    Nav
};
