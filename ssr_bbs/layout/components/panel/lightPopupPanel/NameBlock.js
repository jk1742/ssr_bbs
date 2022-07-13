/***
 * layout:  NameBlock
 ***/
// Describe NameBlock layout below
const NameBlock = function (icon, name, dataName) {
    return $SR.generateHtml`
    <a class="panel-block" data-class="label-block" data-name="${dataName}">
        <span class="panel-icon">
            <i class="${icon}" aria-hidden="true"></i>
        </span>
        <span> ${name} </span>
        <span data-id="label-block-tag" style="margin-left:20px"></span>
    </a>
    `; // HTML end
}
export {
    NameBlock
}
