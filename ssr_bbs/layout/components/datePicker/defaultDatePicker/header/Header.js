/* eslint-disable no-undef */

import { Box } from "./Box";
import { Wrapper } from "./Wrapper";

const Header = function (mode) {
    //* Describe Tags
    const wrapper = new Wrapper(); 
    wrapper.setAttribute('data-id', 'datepicker-header');
    if('range' == mode) {
        wrapper.append(new Box('datetimepicker-selection-start'));
        wrapper.append(new Box('datetimepicker-selection-end'));
    } else {
        wrapper.append(new Box('datetimepicker-selection-start is-centered'));
    }
    return wrapper;
}
export {
    Header
};
