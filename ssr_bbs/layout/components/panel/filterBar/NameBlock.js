/***
 * layout:  NameBlock
 ***/
// Describe NameBlock layout below
const NameBlock = function (icon, name, dataName) {
    return $SR.generateHtml`
    <a class="panel-block" data-class="filter-name-block" data-name="${dataName}">
        <span class="panel-icon">
            <i class="${icon}" aria-hidden="true"></i>
        </span>
        <span> ${name} </span>
        <span style="margin-left:20px"></span>
        <input type='hidden' name=${dataName} value="" />
    </a>
    `; // HTML end
}
export {
    NameBlock
}
