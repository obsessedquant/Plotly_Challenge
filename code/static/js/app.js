// Select the json data and display in the console
d3.json("./samples.json").then(function(data) {
    console.log(data);
    console.log(data.samples);
    console.log(data.samples.sample_values);

    // Sort the data by sample values descending
    let sortedBySampleValues = data.samples.sort((a,b) => b.sample_values - a.sample_values);

    // Slice the first 10 objects for plotting
    slicedData = sortedBySampleValues.slice(0,10);

    // Reverse the array to accommodate Plotly's defaults
    reversedData = slicedData.reverse();
    console.log(reversedData);
    
    // Trace1 for the OTUs data
    let trace1 = {
        x: reversedData.map(object => object.sample_values),
        y: reversedData.map(object => object.otu_ids),
        text: reversedData.map(object => object.otu_ids),
        name: "OTU",
        type: "bar",
        orientation: "h"
    };

    // Data array
    let traceData = [trace1];

    // Apply a title to the layout
    let layout = {
        title: "Top 10 OTU IDs",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    // Render the plot to the div tag with the id "bar"
    Plotly.newPlot("bar", traceData, layout);

});

// console.log(data.samples);



