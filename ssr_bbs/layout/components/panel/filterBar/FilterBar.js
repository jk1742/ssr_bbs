/***
 * layout:  SearchBar
 ***/
import { Footer } from "./Footer"
import { ActionBlock } from "./ActionBlock";
import { Header } from "./Header";
import { NameBlock } from "./NameBlock";

// Describe SearchBar layout below
const FilterBar = function (id, icon, align, style) {
    // const align = 'float:left;';
    const header = new Header('Filter');
    const hscode = new NameBlock('fas fa-book','HS Code');
    const hscodeAction = new ActionBlock('HS Code','width:30%;');
    const footer = new Footer();
    return $SR.generateHtml`
    <div data-id="${id}" style="${align}">
        <a class="button is-primary is-inverted" data-id="search-btn">
            <i class="${icon}" ></i>
        </a>
        <div style="position:relative;">
            <div class="panel is-hidden" style="position:fixed;${style}" data-id="search-panel">
            </div>
        </div>
    </div>
    `; // HTML end
}
export {
    FilterBar
}
