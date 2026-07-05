import { API_ENDPOINTS, getAuthHeader } from '../../utils/api-config';

class PointsTable extends HTMLElement {
    constructor() {
        super();
        this.points = [];
    }

    async connectedCallback() {

        await this.fetchPoints();

        window.addEventListener('point-added', (e) => {
            this.points.unshift(e.detail);
            this.render();
        });

        this.render();
    }

    async fetchPoints() {
        try {
            const response = await fetch(API_ENDPOINTS.GEOMETRY.POINTS, {
                method: 'GET',
                headers: getAuthHeader()
            });
            if (response.ok) {
                this.points = await response.json();
                this.render();
            }
        } catch (err) {
            console.error("Ошибка загрузки точек:", err);
        }
    }

    render() {
        this.innerHTML = `
            <div class="card shadow-2 overflow-auto" style="max-height: 400px;">
                <table class="w-full text-center border-collapse">
                    <thead class="bg-gray-100" style="position: sticky; top: 0;">
                        <tr>
                            <th class="p-3 border">X</th>
                            <th class="p-3 border">Y</th>
                            <th class="p-3 border">R</th>
                            <th class="p-3 border">Результат</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        ${this.points.map(p => `
                            <tr class="hover:bg-gray-50">
                                <td class="p-2 border">${Number(p.x).toFixed(2)}</td>
                                <td class="p-2 border">${Number(p.y).toFixed(2)}</td>
                                <td class="p-2 border">${Number(p.r).toFixed(2)}</td>
                                <td class="p-2 border">
                                    <span style="color: ${p.hit ? '#4caf50' : '#f44336'}; font-weight: bold;">
                                        ${p.hit ? 'ПОПАЛ' : 'ПРОМАХ'}
                                    </span>
                                </td>
                                
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                ${this.points.length === 0 ? '<p class="p-4 text-center">История проверок пуста</p>' : ''}
            </div>
        `;
    }
}

if (!customElements.get('points-table-component')) {
    customElements.define('points-table-component', PointsTable);
}