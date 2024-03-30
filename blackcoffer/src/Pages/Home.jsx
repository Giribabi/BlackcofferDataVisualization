/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import FilterButton from "../Components/FilterButton/FilterButton";
import LineChart from "../Components/LineChart/LineChart";
import BarChart from "../Components/BarChart/BarChart";
import { countries, regions, pestles, topics, sectors } from "../assets/data";
import "./Home.css";
import Nodata from "../Components/Nodata/Nodata";
import Loader from "../Components/Loader/Loader";

function Home() {
    // use Ctrl+Shift+P and select "Join line" from pop up options to join multilines to single line

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showLineChart, setShowLineChart] = useState(false);
    const [showBarChart, setShowBarChart] = useState(false);

    const [countriesCheckedState, setCountriesCheckedState] = useState(
        new Array(countries.length).fill(false)
    );
    const [regionsCheckedState, setRegionsCheckedState] = useState(
        new Array(regions.length).fill(false)
    );
    const [pestlesCheckedState, setPestlesCheckedState] = useState(
        new Array(pestles.length).fill(false)
    );
    const [sectorsCheckedState, setSectorsCheckedState] = useState(
        new Array(sectors.length).fill(false)
    );
    const [topicsCheckedState, setTopicsCheckedState] = useState(
        new Array(topics.length).fill(false)
    );
    // to update the checked state of filter options in each category
    const handleCountriesFilter = (toggledPosition) => {
        const newCountriesCheckedState = countriesCheckedState.map(
            (value, index) => (index === toggledPosition ? !value : value)
        );
        setCountriesCheckedState(newCountriesCheckedState);
    };

    const handleRegionsFilter = (toggledPosition) => {
        const newRegionsCheckedState = regionsCheckedState.map((value, index) =>
            index === toggledPosition ? !value : value
        );
        setRegionsCheckedState(newRegionsCheckedState);
    };

    const handlePestlesFilter = (toggledPosition) => {
        const newPestlesCheckedState = pestlesCheckedState.map((value, index) =>
            index === toggledPosition ? !value : value
        );
        setPestlesCheckedState(newPestlesCheckedState);
    };

    const handleSectorsFilter = (toggledPosition) => {
        const newSectorsCheckedState = sectorsCheckedState.map((value, index) =>
            index === toggledPosition ? !value : value
        );
        setSectorsCheckedState(newSectorsCheckedState);
    };

    const handleTopicsFilter = (toggledPosition) => {
        const newTopicsCheckedState = topicsCheckedState.map((value, index) =>
            index === toggledPosition ? !value : value
        );
        setTopicsCheckedState(newTopicsCheckedState);
    };

    const handleCheckbox = (name, index) => {
        //console.log(name);
        //setting the query string to initial state after every toggling of checkbox.
        setQueryString("type=query&");
        if (name === "Country") handleCountriesFilter(index);
        else if (name === "Region") handleRegionsFilter(index);
        else if (name === "Sector") handleSectorsFilter(index);
        else if (name === "Pestle") handlePestlesFilter(index);
        else if (name === "Topic") handleTopicsFilter(index);
    };

    const [countriesCoordinates, setCountriesCoordinates] = useState([]);
    const [intensityCoordinates, setIntensityCoordinates] = useState([]);
    const [likelihoodCoordinates, setLikelihoodCoordinates] = useState([]);
    const [relevanceCoordinates, setRelevanceCoordinates] = useState([]);

    const chartData = {
        labels: countriesCoordinates,
        datasets: [
            {
                label: "Intensity",
                data: intensityCoordinates,
            },
            {
                label: "Likelihood",
                data: likelihoodCoordinates,
            },
            {
                label: "Relevance",
                data: relevanceCoordinates,
            },
        ],
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    async function fetchChartsData() {
        try {
            //console.log("sending chart data request");
            //console.log(queryString);
            setLoading(true);
            const response = await fetch(
                `http://localhost:3030/filter?+${queryString}`
            );
            const responseData = await response.json();
            //console.log(responseData);
            setCountriesCoordinates(responseData.map((data) => data.country));
            setIntensityCoordinates(responseData.map((data) => data.intensity));
            setLikelihoodCoordinates(
                responseData.map((data) => data.likelihood)
            );
            setRelevanceCoordinates(responseData.map((data) => data.relevance));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            scrollToBottom();

            //console.log("charts request sent and data loaded");
        }
    }

    const [queryString, setQueryString] = useState("type=query&");

    useEffect(() => {
        fetchChartsData();
    }, [queryString]);

    const filters = [
        {
            name: "Country",
            options: countries,
        },
        {
            name: "Region",
            options: regions,
        },
        {
            name: "Pestle",
            options: pestles,
        },
        {
            name: "Topic",
            options: topics,
        },
        {
            name: "Sector",
            options: sectors,
        },
    ];

    const handleFilterSubmit = (e) => {
        setSubmitted(true);
        e.preventDefault();
        //console.log("form submitted");
        var newquery = "";
        for (var index in countries) {
            if (
                countriesCheckedState[index] &&
                !newquery.includes(countries[index]) &&
                !queryString.includes(countries[index])
            ) {
                newquery += "countries=" + countries[index];
                newquery += "&";
            }
        }
        for (var index in regions) {
            if (
                regionsCheckedState[index] &&
                !newquery.includes(regions[index]) &&
                !queryString.includes(regions[index])
            ) {
                newquery += "regions=" + regions[index];
                newquery += "&";
            }
        }
        for (var index in pestles) {
            if (
                pestlesCheckedState[index] &&
                !newquery.includes(pestles[index]) &&
                !queryString.includes(pestles[index])
            ) {
                newquery += "pestles=" + pestles[index];
                newquery += "&";
            }
        }
        for (var index in topics) {
            if (
                topicsCheckedState[index] &&
                !newquery.includes(topics[index]) &&
                !queryString.includes(topics[index])
            ) {
                newquery += "topics=" + topics[index];
                newquery += "&";
            }
        }
        for (var index in sectors) {
            if (
                sectorsCheckedState[index] &&
                !newquery.includes(sectors[index]) &&
                !queryString.includes(sectors[index])
            ) {
                newquery += "sectors=" + sectors[index];
                newquery += "&";
            }
        }
        //console.log(newquery);
        setQueryString(queryString + newquery);
        //console.log(queryString);
        fetchChartsData();
    };
    const isChecked = (filter_item_name, filter_option_index) => {
        //this is to toggle background color of checkboxes when it checkedState is toggled.
        switch (filter_item_name) {
            case "Country":
                return countriesCheckedState[filter_option_index];
            case "Region":
                return regionsCheckedState[filter_option_index];
            case "Pestle":
                return pestlesCheckedState[filter_option_index];
            case "Topic":
                return topicsCheckedState[filter_option_index];
            default:
                return sectorsCheckedState[filter_option_index];
        }
    };
    return (
        <div>
            <div className="page-heading">Blackcoffer Data Visualization</div>
            <div className="directions">
                Use the filter options to filter and visualize data as you like.
            </div>
            <div className="filter-categories">
                <form onSubmit={handleFilterSubmit}>
                    {filters.map((filter_item, index) => (
                        <div className="filter" key={index}>
                            <div className="filter-heading-container">
                                <FilterButton name={filter_item.name} />
                            </div>
                            <div className="filter-options-container">
                                <div className="filter-options">
                                    {filter_item.options.map(
                                        (filter_option, index) => (
                                            <div
                                                style={{
                                                    display: "inline-block",
                                                    color: isChecked(
                                                        filter_item.name,
                                                        index
                                                    )
                                                        ? "white"
                                                        : "black",
                                                    backgroundColor: isChecked(
                                                        filter_item.name,
                                                        index
                                                    )
                                                        ? "rgb(0, 200, 200)"
                                                        : "white",
                                                    boxShadow: isChecked(
                                                        filter_item.name,
                                                        index
                                                    )
                                                        ? "2px 2px rgb(150, 223, 223)"
                                                        : "2px 2px rgb(125, 125, 125)",
                                                }}
                                                className="filter-checkbox-container"
                                                key={`${filter_option}+${
                                                    index + 1
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`${filter_option}+${index}`}
                                                    onChange={() =>
                                                        handleCheckbox(
                                                            filter_item.name,
                                                            index
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`${filter_option}+${index}`}
                                                >
                                                    {filter_option + " "}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="chart-selection">
                        <div className="chart-selection-text">
                            Select the charts through which you want to
                            visualize data:
                        </div>
                        <div className="chart-options-container">
                            <div
                                className="chart-options"
                                style={{
                                    opacity: showBarChart ? "1" : "0.65",
                                }}
                                onClick={() => setShowBarChart(!showBarChart)}
                            >
                                Bar Chart
                            </div>
                            <div
                                className="chart-options"
                                style={{
                                    opacity: showLineChart ? "1" : "0.60",
                                }}
                                onClick={() => setShowLineChart(!showLineChart)}
                            >
                                Line Chart
                            </div>
                        </div>
                    </div>
                    <div className="submit-button-container">
                        <a href="#charts">
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </a>
                    </div>
                </form>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="data-container">
                    {countriesCoordinates.length > 0 && submitted ? (
                        <div className="charts">
                            {showLineChart && (
                                <div className="charts-container">
                                    <LineChart data={chartData} />
                                </div>
                            )}
                            {showBarChart && (
                                <div className="charts-container">
                                    <BarChart data={chartData} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="no-data-display">
                            <Nodata />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
