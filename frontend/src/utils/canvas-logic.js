export const canvasSize = 400;
export const lineWidth = 2;
export const textMargin = 9;
export const mainColor = '#857466';
export const center = canvasSize / 2;
export const gridCellsPerRadius = 2;

export function setupCanvas(ctx) {
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    return ctx;
}

export function drawGrid(ctx, scale) {
    ctx.strokeStyle = 'rgba(133, 116, 102, 0.2)'; // Светлая сетка
    ctx.lineWidth = 1;
    const step = scale / gridCellsPerRadius;
    for (let i = 0; i <= canvasSize; i += step) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvasSize); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvasSize, i); ctx.stroke();
    }
}

export function drawAxisLabels(ctx, r, scale) {
    const steps = [
        {value: -1, label: '-R'},
        {value: -0.5, label: '-R/2'},
        {value: 0.5, label: 'R/2'},
        {value: 1, label: 'R'}
    ];
    const tickLength = 6;
    ctx.fillStyle = mainColor;

    steps.forEach(step => {

        const xValue = center + step.value * scale * (r || 1);
        const xLabel = r ? (step.value * r).toFixed(1) : step.label;
        ctx.fillText(xLabel, xValue, center + textMargin * 1.5);
        ctx.beginPath(); ctx.moveTo(xValue, center - tickLength/2); ctx.lineTo(xValue, center + tickLength/2); ctx.stroke();

        const yValue = center - step.value * scale * (r || 1);
        const yLabel = r ? (step.value * r).toFixed(1) : step.label;
        ctx.fillText(yLabel, center - textMargin * 1.5, yValue);
        ctx.beginPath(); ctx.moveTo(center - tickLength/2, yValue); ctx.lineTo(center + tickLength/2, yValue); ctx.stroke();
    });
}

export function drawAxeOnCoordinatePlane(ctx, fromX, fromY, toX, toY) {
    const lengthOfHead = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - lengthOfHead * Math.cos(angle - Math.PI/6), toY - lengthOfHead * Math.sin(angle - Math.PI/6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - lengthOfHead * Math.cos(angle + Math.PI/6), toY - lengthOfHead * Math.sin(angle + Math.PI/6));
    ctx.stroke();
}

export function convertIntoCanvasCoordinates(x, y, scale) {
    return [center + x * scale, center - y * scale];
}

export function drawShapes(ctx, r, scale) {
    const rForDrawing = r || 1;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'rgba(133, 116, 102, 0.3)';
    ctx.fillStyle = 'rgba(227, 237, 250, 0.6)';

    ctx.beginPath();
    ctx.moveTo(center, center);
    let [x1, y1] = convertIntoCanvasCoordinates(-rForDrawing/2, 0, scale);
    ctx.lineTo(x1, y1);
    let [x2, y2] = convertIntoCanvasCoordinates(-rForDrawing/2, rForDrawing, scale);
    ctx.lineTo(x2, y2);
    let [x3, y3] = convertIntoCanvasCoordinates(0, rForDrawing, scale);
    ctx.lineTo(x3, y3);
    ctx.closePath(); ctx.fill(); ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(center, center);
    let [x4, y4] = convertIntoCanvasCoordinates(0, rForDrawing/2, scale);
    ctx.lineTo(x4, y4);
    let [x5, y5] = convertIntoCanvasCoordinates(rForDrawing/2, 0, scale);
    ctx.lineTo(x5, y5);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, (rForDrawing/2) * scale, 0, Math.PI / 2, false);
    ctx.closePath(); ctx.fill(); ctx.stroke();
}

export function drawPointOnCoordinatePlane(ctx, x, y, wasThereHit, scale) {
    ctx.fillStyle = wasThereHit ? '#C0E6B1' : '#D14545';
    ctx.beginPath();
    let [newX, newY] = convertIntoCanvasCoordinates(x, y, scale);
    ctx.arc(newX, newY, 4, 0, 2*Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
}

export function redraw(r, ctx) {
    if (!ctx) return;
    setupCanvas(ctx);
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    const scale = (canvasSize / 2) / ((r || 1) * gridCellsPerRadius);
    drawGrid(ctx, scale);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = mainColor;
    drawAxeOnCoordinatePlane(ctx, 0, center, canvasSize, center);
    drawAxeOnCoordinatePlane(ctx, center, canvasSize, center, 0);
    drawAxisLabels(ctx, r, scale);
    drawShapes(ctx, r, scale);
}