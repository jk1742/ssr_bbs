import './Menu.css';

/**
 * block:  Menu
 * @param {*} id
 * @param {*} styles
 * @returns
 * * */
// Describe constant Class below
const Menu = function (id, styles) {
  return $SR.generateHtml `
  <div class="menu-top menu-top-fixed menu-animate" id="${id}" style="${styles}">
    <a href="javascript:void(0)" class="closebtn">&times;</a>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column">
        <aside class="menu">
          <p class="menu-label">
            General
          </p>
          <ul class="menu-list">
            <li><a>Dashboard</a></li>
          </ul>
        </aside>
      </div>
  </div>
  `; // HTML end
}
export {
  Menu
};
