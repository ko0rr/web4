import { API_ENDPOINTS, getAuthHeader } from '../../utils/api-config';

class PointFormComponent extends HTMLElement {
    connectedCallback() {
        window.addEventListener('point-clicked', (e) => {
            this.querySelector('input[name="x"]').value = e.detail.x;
            this.querySelector('input[name="y"]').value = e.detail.y;
        });
        this.render();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const pointData = {
            x: parseFloat(formData.get('x')),
            y: parseFloat(formData.get('y')),
            r: parseFloat(formData.get('r'))
        };

        try {
            const response = await fetch(API_ENDPOINTS.GEOMETRY.POINTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(pointData)
            });

            if (response.ok) {
                const result = await response.json();

                window.dispatchEvent(new CustomEvent('point-added', {
                    detail: result,
                    bubbles: true
                }));
            } else {
                alert("Ошибка при проверке точки");
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    }

    render() {
        this.innerHTML = `
            <div class="card p-4 shadow-2">
                <h3>Ввод координат</h3>
                <form id="point-form">
                    <div class="field mb-3">
                        <label class="block">X (-3..3):</label>
                        <input type="number" name="x" step="0.1" class="p-inputtext w-full" required />
                    </div>
                    <div class="field mb-3">
                        <label class="block">Y (-5..5):</label>
                        <input type="number" name="y" step="0.1" class="p-inputtext w-full" required />
                    </div>
                    <div class="field mb-3">
                        <label class="block">R (0..3):</label>
                        <input type="number" name="r" step="0.1" class="p-inputtext w-full" id="r-input" required />
                    </div>
                    <button type="submit" class="p-button p-component w-full">Проверить</button>
                </form>
            </div>
        `;
        this.querySelector('#point-form').addEventListener('submit', (e) => this.handleSubmit(e));


        this.querySelector('#r-input').addEventListener('input', (e) => {
            window.dispatchEvent(new CustomEvent('r-changed', { detail: e.target.value }));
        });
    }
}

if (!customElements.get('point-form-component')) {
    customElements.define('point-form-component', PointFormComponent);
}