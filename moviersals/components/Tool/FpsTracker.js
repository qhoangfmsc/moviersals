export default function buildFpsChecker() {
    var script = document.createElement('script');
    script.onload = function () {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = '/js/FpsTrackerSrc.min.js';
    document.head.appendChild(script)
};