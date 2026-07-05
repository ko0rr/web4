import {
    redraw,
    drawPointOnCoordinatePlane,
    canvasSize,
    center,
    gridCellsPerRadius
} from '../../utils/canvas-logic';
import { store } from '../../store/store';
import { pointsApi } from '../../api/pointsApi';

class PointVisualizer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.canvas = document.createElement('canvas');
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
        this.canvas.style.background = "#f43";
        this.canvas.style.borderRadius = "8px";
        this.canvas.style.cursor = "crosshair";

        this.shadowRoot.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.currentR = 1;
    }

    connectedCallback() {
        this.refreshChart();

        window.addEventListener('r-changed', (e) => {
            this.currentR = parseFloat(e.detail) || 1;
            this.refreshChart();
        });


        window.addEventListener('point-added', (e) => {
            const scale = (canvasSize / 2) / (this.currentR * gridCellsPerRadius);
            drawPointOnCoordinatePlane(this.ctx, e.detail.x, e.detail.y, e.detail.hit, scale);

        });


        this.canvas.addEventListener('mousedown', (e) => this.handleCanvasClick(e));
    }

    async handleCanvasClick(e) {

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const scale = (canvasSize / 2) / (this.currentR * gridCellsPerRadius);


        const x = ((mouseX - center) / scale).toFixed(2);
        const y = ((center - mouseY) / scale).toFixed(2);

        console.log(`Клик: x=${x}, y=${y}, r=${this.currentR}`);

        try {
            const result = await store.dispatch(
                pointsApi.endpoints.addPoint.initiate({
                    x: parseFloat(x),
                    y: parseFloat(y),
                    r: this.currentR
                })
            ).unwrap();


            drawPointOnCoordinatePlane(this.ctx, result.x, result.y, result.hit, scale);

            window.dispatchEvent(new CustomEvent('point-added', {
                detail: result,
                bubbles: true,
                composed: true
            }));

            window.dispatchEvent(new CustomEvent('point-clicked', {
                detail: { x, y }
            }));

        } catch (err) {
            console.error("Ошибка при клике по графику:", err);
            if (err.status === 401) alert("Сессия истекла, войдите заново");
        }
    }

    refreshChart() {
        redraw(this.currentR, this.ctx);

        const state = store.getState();
        const pointsData = pointsApi.endpoints.getPoints.select()(state);
        const points = pointsData.data;

        if (points && Array.isArray(points)) {
            const scale = (canvasSize / 2) / (this.currentR * gridCellsPerRadius);
            points.forEach(p => {
                drawPointOnCoordinatePlane(this.ctx, p.x, p.y, p.hit, scale);
            });
        }
    }
}

if (!customElements.get('point-visualizer')) {
    customElements.define('point-visualizer', PointVisualizer);
}