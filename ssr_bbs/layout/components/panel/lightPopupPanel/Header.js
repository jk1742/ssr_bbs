/***
 * layout:  SearchBar
 ***/

// Describe SearchBar layout below
const Header = function (name) {
    return $SR.generateHtml`
    <p class="panel-heading">
        ${name}
    </p>
    `; // HTML end
}
export {
    Header
}
