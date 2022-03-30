/***
 * layout:  EditTopBarController control buttons
 ***/
// Describe EditTopBarController layout below
const ProgressBarController   = function(progressBarHandler) {

  // private variable & mapping ////////////////////////////////////////////////
  const me                    = this;
  const adPlate               = this.lastChild;
  const template              = this.firstChild;
  const coffee                = template.childNodes[0].firstChild;
  const paypalme              = template.childNodes[1].firstChild;
  const ads                   = template.childNodes[2].firstChild;
  const progressLabel         = template.childNodes[3].firstChild;
  const progressBar           = template.childNodes[4].firstChild;
  const subLabel              = template.childNodes[5].firstChild;
  const subValue              = template.childNodes[6];
  const secondLabel           = template.childNodes[7].firstChild;
  const secondValue           = template.childNodes[8].firstChild;
  let   adSwitch              = false;

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    barValue: {
      get: function() {
        return progressBar.value;
      },
      set: function(o) {
        progressBar.value = o;
      },
    },
    barLabel: {
      get: function() {
        return progressLabel.innerHTML;
      },
      set: function(o) {
        progressLabel.innerHTML = o;
      },
    },
    rSubLabel: {
      get: function() {
        return subLabel.innerHTML;
      },
      set: function(o) {
        subLabel.innerHTML = o;
      },
    },
    rSubValue: {
      get: function() {
        return subValue.innerHTML;
      },
      set: function(o) {
        subValue.innerHTML = o;
      },
    },
    secondLabel: {
      get: function() {
        return secondLabel.innerHTML;
      },
      set: function(o) {
        secondLabel.innerHTML = o;
      },
    },
    secondValue: {
      get: function() {
        return secondValue.innerHTML;
      },
      set: function(o) {
        secondValue.innerHTML = o;
      },
    }
  });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // bindProgressBar (o) {
    //   progressBar.value = o;
    // },
  });

  // Event handler /////////////////////////////////////////////////////////////
  ads.onclick = (e) => {
    let adPlateView = '';
    if('block' == adPlate.style.display) adPlateView = 'none';
    else adPlateView = 'block';
    adPlate.style.display = adPlateView;
    if('undefined' !== typeof progressBarHandler.onclick_ads) progressBarHandler.onclick_ads(e, this.id);
  }
  adPlate.onclick = (e) => {
    adPlate.style.display = 'none';
    if('undefined' !== typeof progressBarHandler.onclick_ads) progressBarHandler.onclick_ads(e, this.id);
  }
  paypalme.onclick = (e) => {
    window.open('https://paypal.me/synthesisIntel/1', '_blank').focus();
    if('undefined' !== typeof progressBarHandler.onclick_paypalme) progressBarHandler.onclick_paypalme(e, this.id);
  }
  coffee.onclick = (e) => {
    window.open('https://www.buymeacoffee.com/synthofintel', '_blank').focus();
    if('undefined' !== typeof progressBarHandler.onclick_coffee) progressBarHandler.onclick_coffee(e, this.id);
  }

  // Lazy Initialization ///////////////////////////////////////////////////////
  ads.style.display = 'none';

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ProgressBarController
};
