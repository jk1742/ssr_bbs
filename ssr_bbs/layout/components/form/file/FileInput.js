/***
 * block:  FileInput
 * style parameter indicator
 *  Sizes
 *      is-small
 *      is-normal (default)
 *      is-medium
 *      is-large
 *  Alignment
 *      is-right
 *      is-centered
 *  layer-style
 *      is-boxed
 *      is-fullwidth
 *  colors
 *      is-white
 *      is-black
 *      is-light
 *      is-dark
 *      is-primary
 *      is-link
 *      is-info
 *      is-success
 *      is-warning
 *      is-danger
 ***/
const FileInput = function (style) {
    let dom =  $SR.generateHtml`
    <div class="file ${style}" data-class="file-input">
        <label class="file-label">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
                <span class="file-icon">
                    <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                    Choose a file…
                </span>
            </span>
        </label>
    </div>
    `; // HTML end
    const fx = function () {
        Object.assign(this, {
            setIcon: function (icon) {
                const fileIconBox = this.getElementsByClassName('file-icon')[0]; 
                fileIconBox.innerHTML = '';
                const fileIcon = document.createElement('I');
                fileIconBox.append(fileIcon);
                fileIcon.className = icon;
                return this;
            },
            setLabel: function(label){
                const _dom = this.querySelector('span.file-label');
                _dom.innerHTML = '';
                _dom.append(document.createTextNode(label))
                return this;
            },
            setName: function (name) {
                this.classList.add('has-name');
                const _dom = this.querySelector('label.file-label');
                const $span = document.createElement('SPAN');
                $span.className = 'file-name';
                $span.append(document.createTextNode(name));
                _dom.append($span);
                return this;
            }
        });
    }
    fx.call(dom);
    return dom;
}
export {
    FileInput
}
