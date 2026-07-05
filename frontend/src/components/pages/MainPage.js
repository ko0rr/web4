import React from "react";

export const MainPage = () => {
    return (
        <div className="container p-4">
            <h2 className="text-center mb-4">Геометрическая проверка</h2>

            <div className="grid">
                <div className="col-12 md:col-6 flex justify-content-center">
                    {/* График */}
                    <point-visualizer></point-visualizer>
                </div>
                <div className="col-12 md:col-6">
                    {/* Форма */}
                    <point-form-component></point-form-component>
                </div>

                {/*Таблица с результатами */}
                <div className="col-12 mt-4">
                    <points-table-component></points-table-component>
                </div>
            </div>
        </div>
    );
};