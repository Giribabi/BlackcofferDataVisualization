/* eslint-disable no-unused-vars */
import React from "react";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function BarChart(props) {
    return (
        <div className="bar-chart-container" style={{ width: "80%" }}>
            <Bar data={props.data} />
        </div>
    );
}

export default BarChart;
