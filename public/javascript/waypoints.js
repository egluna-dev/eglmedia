const waypoint = document.querySelector('.container');
const webAbout_left = document.getElementById('about-left');
const webAbout_right = document.getElementById('about-right');

const waypoint_1 = new Waypoint({
    element: waypoint,
    handler: function(direction) {
        webAbout_left.classList.add('animated');
        webAbout_right.classList.add('animated');

    },
    offset: 275
});