'use strict';
const LocalDate = function () {

    const main = function () {

        //* private variable //////////////////////////////////////////////////
        let _private = {
            dateType: 'yyyyMMdd',
        };


        //* Privilege Static Functions //////////////////////////////////////////////
        // const articleCSSIterator = (me, skeleton, fxo) => {
        //     const structure = [...me.getElementsByClassName(skeleton)];
        //     for (const iterator of structure) {
        //         fxo(iterator);
        //     }
        // }


        //* Access Control: getter & setter /////////////////////////////////////////
        Object.defineProperties(this, {
            dateType: {
                get: () => _private.dateType,
                configurable: false, enumerable:true
            },
        });


        //* Access control: Public functions ////////////////////////////////////////
        Object.assign(this, {
            stringParseDate(str, _datetype) {
                if (_datetype == 'yyyyMMdd'){
                    const y = str.substr(0, 4);
                    const m = str.substr(4, 2) - 1;
                    const d = str.substr(6, 2);
                    const D = new Date(y, m, d);
                    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
                } else {
                    return new Date(str);
                }
            },
            dateParseString(date, _datetype) {
                switch (_datetype) {
                    case 'yyyy-MM-dd':
                        return new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    case 'yyyy/MM/dd':
                        return new Date(date).toLocaleDateString('en-ZA');
                    case 'MM/dd/yyyy':
                        return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    case 'dd-mon-yyyy':
                        return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
                    default:
                        return new Date(date).toLocaleDateString('en-CA');
                }
            }
        });


        //* Lazy Initialization /////////////////////////////////////////////////////


        //* End of Structure ////////////////////////////////////////////////////////
    }
    main.call(this);
    Object.seal(this);
    return this;
}
export { LocalDate };