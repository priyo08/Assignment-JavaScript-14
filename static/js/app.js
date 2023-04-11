function init() {
    buildThePlot();
}

// Build/Rebuild the plot when the option (Test Subject ID No.) is changed
function optionChanged() {
    buildThePlot();
}

// Run this during init and when an option is changed.
function buildThePlot() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        console.log("Data from json");
        console.log(data);
        var idValues = data.names;

        idValues.forEach((id) => d3.select("#selDataset").append("option").text(id).property("value", id));

        var currentID = d3.selectAll("#selDataset").node().value;
        console.log("Current ID: " +currentID);

        filteredID = data.samples.filter((entry) => entry.id == currentID);

        var trace1 = {
            x: filteredID[0].sample_values.slice(0, 10).reverse(),
            y: filteredID[0].otu_ids.slice(0, 10).reverse().map((int) => "OTU " + int.toString()),
            text: filteredID[0].otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        };

        console.log("Trace1: ");
        console.log(trace1);

        var dataPlot = [trace1];

        var layout = {
            title: "Top 10 OTUs"
        };

        Plotly.newPlot("bar", dataPlot, layout);

        // Demographic data
        filteredMetadata = data.metadata.filter((entry) => entry.id == currentID);

        var demographics = {
            "ID: ": filteredMetadata[0].id,
            "Ethnicity: ": filteredMetadata[0].ethnicity,
            "Gender: ": filteredMetadata[0].gender,
            "Age: ": filteredMetadata[0].age,
            "Location: ": filteredMetadata[0].location,
            "bbtype: ": filteredMetadata[0].bbtype,
            "wfreq: ": filteredMetadata[0].wfreq,
        };

        console.log("demographics: ");
        console.log(demographics);

        panelBody = d3.select("#sample-metadata");

        panelBody.html("");

        Object.entries(demographics).forEach(([key, value]) => {
            panelBody
                .append("p")
                .attr("style", "font-weight: bold; color: teal;")
                .text(key + value);
        });

        // Bubble chart
        var trace2 = {
            x: filteredID[0].otu_ids,
            y: filteredID[0].sample_values,
            text: filteredID[0].otu_labels,
            mode: "markers",
            marker: {
                color: filteredID[0].otu_ids,
                size: filteredID[0].sample_values,
            },
        };

        var bubbleData = [trace2];

        var bubbleLayout = {
            showlegend: false,
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        console.log(filteredID);
        bonus();
    });
}

// Run the init
init();
console.log('Init')