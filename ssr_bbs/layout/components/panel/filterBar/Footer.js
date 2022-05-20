/***
 * layout:  SearchBar
 ***/

// Describe SearchBar layout below
const Footer = function () {
    return $SR.generateHtml`
    <div class="panel-block">
        <button class="button is-link is-outlined" style="margin-right:1vw;">
            Adapt
        </button>
        <button class="button is-link is-outlined">
            Reset all filters
        </button>
    </div>
    `; // HTML end
}
export {
    Footer
}
