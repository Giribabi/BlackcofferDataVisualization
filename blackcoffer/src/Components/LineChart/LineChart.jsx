/* eslint-disable no-unused-vars */
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

function LineChart(props) {
    return (
        <div
            className="Line-chart-container"
            style={{
                width: "80%",
            }}
        >
            <Line data={props.data} />
        </div>
    );
}

export default LineChart;
