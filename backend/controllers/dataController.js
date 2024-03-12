const Model = require("../models/model");
const filterCategoriesModel = require("../models/filterCatergoriesModel");
const filterOptions = require("../filterdata/filterdata");

exports.getAlldata = (req, res, next) => {
    // skipping 70 items gives you 15 items with regular intervals from 999 items.
    // Model.find()
    //     .limit(1)
    //     .skip(70)
    //     .limit(2)
    //     .skip(70)
    //     .limit(3)
    //     .skip(70)
    //     .limit(4)
    //     .skip(70)
    //     .limit(5)
    //     .skip(70)
    //     .limit(6)
    //     .skip(70)
    //     .limit(7)
    //     .skip(70)
    //     .limit(8)
    //     .skip(70)
    //     .limit(9)
    //     .skip(70)
    //     .limit(10)
    //     .skip(70)
    //     .limit(11)
    //     .skip(70)
    //     .limit(12)
    //     .skip(70)
    //     .limit(13)
    //     .skip(70)
    //     .limit(14)
    //     .skip(70)
    //     .limit(15)
    Model.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.getCategories = (req, res, next) => {
    filterCategoriesModel
        .find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.getFiltereddata = (req, res, next) => {
    //console.log("query is:");
    //console.log(req.query);
    // if there is no such filter category then add all the available options to that category.
    req.query.countries = req.query.countries
        ? req.query.countries
        : filterOptions.countries;
    req.query.regions = req.query.regions
        ? req.query.regions
        : filterOptions.regions;
    req.query.pestles = req.query.pestles
        ? req.query.pestles
        : filterOptions.pestles;
    req.query.topics = req.query.topics
        ? req.query.topics
        : filterOptions.topics;
    req.query.sectors = req.query.sectors
        ? req.query.sectors
        : filterOptions.sectors;
    Model.find({
        $and: [
            {
                country: {
                    $in: Array.isArray(req.query.countries)
                        ? req.query.countries
                        : [req.query.countries],
                },
            },
            {
                sector: {
                    $in: Array.isArray(req.query.sectors)
                        ? req.query.sectors
                        : [req.query.sectors],
                },
            },
            {
                topic: {
                    $in: Array.isArray(req.query.topics)
                        ? req.query.topics
                        : [req.query.topics],
                },
            },
            {
                pestle: {
                    $in: Array.isArray(req.query.pestles)
                        ? req.query.pestles
                        : [req.query.pestles],
                },
            },
            {
                region: {
                    $in: Array.isArray(req.query.regions)
                        ? req.query.regions
                        : [req.query.regions],
                },
            },
        ],
    })
        .limit(8)
        .then((data) => {
            //console.log(data);
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
