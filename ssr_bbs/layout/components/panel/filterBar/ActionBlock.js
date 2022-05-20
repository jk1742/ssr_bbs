/***
 * layout:  ActionBlock
 ***/
// Describe ActionBlock layout below
const ActionBlock = function (name, space) {
    return $SR.generateHtml`
    <div class="panel-block">
        <span style="${space}">
            ${name}
        </span>
        <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Search" data-id="filter-block-input">
            <span class="icon is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
            </span>
        </p>
        <a class="button is-primary is-inverted" data-id="filter-block-select">
            <i class="fa-solid fa-check"></i>
        </a>
        <a class="button is-primary is-inverted" data-id="filter-block-cancel">
            <i class="fa-solid fa-xmark"></i>
        </a>
    </div>
    `; // HTML end
}
export {
    ActionBlock
}
