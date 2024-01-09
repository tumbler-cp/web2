var canvas = document.querySelector('#svg');
var pointList = JSON.parse(sessionStorage.getItem('points')) || [];
var lastR = Number(sessionStorage.getItem('lastR')) || 0;
var canvasWidth = canvas.getBoundingClientRect().width;
function addPoint(canvasX, canvasY, radius, hit) {
    pointList.push({
        pointX: canvasX, pointY: canvasY, pointR: radius, pointHit: hit,
    });
}
function drawPoint(canvasX, canvasY, hit) {
    var circle = "<circle\n        class=\"point\"\n        cx=\"".concat(canvasX - 18, "\"\n        cy=\"").concat(canvasY - 18, "\"\n        stroke=\"").concat(hit ? '#00FF00' : '#FF0000', "\" r=\"5\"/>");
    canvas.insertAdjacentHTML('beforeend', circle);
}
function drawAllPoints() {
    pointList.forEach(function (p) {
        drawPoint(p.pointX, p.pointY, p.pointHit);
    });
}
function handleJson(canvasX, canvasY, x, y, radius) {
    var data = createFormData(x, y, radius);
    var resp = postDataToController(data);
    resp.then(function (resp) {
        if (resp.status === 200)
            return resp.json();
        drawPoint(canvasX, canvasY, false);
    }).then(function (json) {
        console.log(json);
        if (json['hit']) {
            addPoint(canvasX, canvasY, radius, true);
            sessionStorage.setItem('points', JSON.stringify(pointList));
            return drawPoint(canvasX, canvasY, true);
        }
    }).catch(reportError);
    drawPoint(canvasX, canvasY, false);
    addPoint(canvasX, canvasY, radius, false);
    sessionStorage.setItem('points', JSON.stringify(pointList));
    location.replace(location.href);
}
function updateR() {
    if (lastR === 0) {
        lastR = r;
        sessionStorage.setItem('lastR', lastR.toString());
        return;
    }
    var changeR = r / lastR;
    document.querySelectorAll('.point').forEach(function (p) { return p.remove(); });
    pointList.forEach(function (point) {
        var xReal = ((point.pointX - (canvasWidth / 2)) / 100) * lastR;
        var yReal = 0 - ((point.pointY - (canvasWidth / 2)) / 100) * lastR;
        point.pointX = (xReal / changeR) / lastR * 100 + (canvasWidth / 2);
        point.pointY = 0 - (yReal / changeR) / lastR * 100 + (canvasWidth / 2);
    });
    drawAllPoints();
    lastR = r;
    sessionStorage.setItem('lastR', lastR.toString());
}
canvas.addEventListener('click', function (e) {
    if (!setRValue()) {
        setStateMessage('Выберите R!');
        return;
    }
    var rect = canvas.getBoundingClientRect();
    var canvasX = e.clientX - rect.left;
    var canvasY = e.clientY - rect.top;
    var xReal = ((canvasX - (canvasWidth / 2)) / 100) * r;
    var yReal = 0 - ((canvasY - (canvasWidth / 2)) / 100) * r;
    handleJson(canvasX, canvasY, xReal, yReal, r);
    drawAllPoints();
});
if (pointList)
    drawAllPoints();
