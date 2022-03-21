console.log(
    'The print.js module has loaded! See the network tab in dev tools...'
);

// build plate
const main = document.getElementById('main_frame');

const framePlate = document.createElement('div');

const btn_in_mod_run = document.createElement('button');

btn_in_mod_run.innerHTML = 'in mod run';

framePlate.append(btn_in_mod_run);

main.appendChild(framePlate);

export default () => {
    console.log('Button Clicked: Here\'s "some text"!', main);
    btn_in_mod_run.onclick = () => {
        console.log('hello btn_in_mod_run');
    };
};