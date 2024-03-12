const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
    end_year: { type: String, required: true },
    intensity: { type: Number, required: true },
    sector: { type: String, required: true },
    topic: { type: String, required: true },
    insight: { type: String, required: true },
    url: { type: String, required: true },
    region: { type: String, required: true },
    start_year: { type: Number, required: true },
    impact: { type: String, required: true },
    added: { type: Date, required: true },
    published: { type: Date, required: true },
    country: { type: String, required: true },
    relevance: { type: Number, required: true },
    pestle: { type: String, required: true },
    source: { type: String, required: true },
    title: { type: String, required: true },
    likelihood: { type: Number, required: true },
});

module.exports = mongoose.model("Model", modelSchema);
