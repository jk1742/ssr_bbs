/* eslint-disable no-undef */

import { Range } from "./Range";
import { Single } from "./Single";

const Dummy = function (mode) {
    let domObject;
    if ('range' == mode) domObject = new Range();
    else domObject = new Single();

    //* Describe Tags
    return $SR.generateHtml `
    <div class="datetimepicker-dummy is-primary" data-mode="${mode}">
        <!-- range or single-->
        ${domObject.outerHTML}
        <button class="datetimepicker-clear-button" type="button"> + </button>
    </div>
    `; // HTML end
}
export {
    Dummy
};
