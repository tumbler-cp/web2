interface Point {
    pointX: number;
    pointY: number;
    pointR: number;
    pointHit: boolean;
}

const canvas: HTMLElement = document.querySelector('#svg');
const pointList: Point[] = JSON.parse(sessionStorage.getItem('points')) || [];
let lastR: number = Number(sessionStorage.getItem('lastR')) || 0;

const canvasWidth: number = canvas.getBoundingClientRect().width;

function addPoint(canvasX: number, canvasY: number, radius: number, hit: boolean) {
    pointList.push({
        pointX: canvasX, pointY: canvasY, pointR: radius, pointHit: hit,
    });
}

function drawPoint(canvasX: number, canvasY: number, hit: boolean) {
    const circle = `<circle
        class="point"
        cx="${canvasX - 18}"
        cy="${canvasY - 18}"
        stroke="${hit ? '#00FF00' : '#FF0000'}" r="5"/>`;
    canvas.insertAdjacentHTML('beforeend', circle);
}

function drawAllPoints() {
    pointList.forEach((p) => {
        drawPoint(p.pointX, p.pointY, p.pointHit);
    });
}

function handleJson(canvasX: number, canvasY: number, x: number, y: number, radius: number) {
    const data = createFormData(x, y, radius);
    const resp = postDataToController(data);

    resp.then((resp) => {
        if (resp.status === 200) return resp.json();
        drawPoint(canvasX, canvasY, false);
    }).then((json) => {
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

    const changeR = r / lastR;
    document.querySelectorAll('.point').forEach((p) => p.remove());

    pointList.forEach((point) => {
        const xReal = ((point.pointX - (canvasWidth / 2)) / 100) * lastR;
        const yReal = 0 - ((point.pointY - (canvasWidth / 2)) / 100) * lastR;

        point.pointX = (xReal / changeR) / lastR * 100 + (canvasWidth / 2);
        point.pointY = 0 - (yReal / changeR) / lastR * 100 + (canvasWidth / 2);
    });

    drawAllPoints();

    lastR = r;
    sessionStorage.setItem('lastR', lastR.toString());
}

canvas.addEventListener('click', (e) => {
    if (!setRValue()) {
        setStateMessage('Выберите R!');
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    const xReal = ((canvasX - (canvasWidth / 2)) / 100) * r;
    const yReal = 0 - ((canvasY - (canvasWidth / 2)) / 100) * r;

    handleJson(canvasX, canvasY, xReal, yReal, r);
    drawAllPoints();
});

if (pointList) drawAllPoints();
