var home;

home = (function() {
    document.querySelector('data-button-action').addEventListener('onclick', function(){
        console.log(window.location.href);
    });
})();

module.exports = home;