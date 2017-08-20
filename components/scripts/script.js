var $ = require('jquery');

function updateCopyYear(){
    var date = new Date();
    document.querySelector('#copyright').innerHTML = date.getFullYear();
}

updateCopyYear();
