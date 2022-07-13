/***
 * layout:  LightPanel
 ***/

// Describe LightPanel layout below
const LightPopupPanel = function () {
    let dom = $SR.generateHtml`
    <div data-class="light-popup-panel" style="float:left">
        <a class="button is-primary is-inverted" data-id="icon-btn">
            <i class="fa-solid fa-gear" ></i>
        </a>
        <div style="position:relative;">
            <div class="panel is-hidden" style="position:fixed;" data-id="popup-panel">
            </div>
        </div>
    </div>
    `; // HTML end
    const fx = function () {
        Object.assign(this, {
            setIcon: function (_icon) {
                const iconBox = this.querySelectorAll(`a[data-id="icon-btn"]`)[0];
                iconBox.innerHTML = '';
                const fileIcon = document.createElement('I');
                iconBox.append(fileIcon);
                fileIcon.className = _icon;
                return this;
            },
            setAlign: function (_align) {
                this.style = `float:${_align}`;
                return this;
            },
            setStyle: function (param) {
                const popup = this.querySelectorAll(`div[data-id="popup-panel"]`)[0];
                popup.style.cssText = `position: fixed; ${param}`;
                return this;
            }
        });
    }
    fx.call(dom);
    return dom;
}
export {
    LightPopupPanel
}
