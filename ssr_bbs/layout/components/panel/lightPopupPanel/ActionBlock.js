/***
 * layout:  ActionBlock
 ***/
// Describe ActionBlock layout below
const ActionBlock = function (name, dataName, space, icon, placeHolder) {
    return $SR.generateHtml`
    <div class="panel-block" data-class="action-block" data-name="${dataName}">
        <span style="${space}">
            ${name}
        </span>
        <p class="control has-icons-left">
            <input class="input" type="text" placeholder="${placeHolder}" data-id="action-block-input">
            <span class="icon is-left">
                <i class="${icon}" aria-hidden="true"></i>
            </span>
        </p>
        <a class="button is-primary is-inverted" data-id="action-block-select">
            <i class="fa-solid fa-check"></i>
        </a>
        <a class="button is-primary is-inverted" data-id="action-block-cancel">
            <i class="fa-solid fa-xmark"></i>
        </a>
    </div>
    `; // HTML end
}
export {
    ActionBlock
}
