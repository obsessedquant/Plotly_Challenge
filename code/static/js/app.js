// This function will be run at the start or refresh of the page

function init() {
  let targetID = '940';

  // Select the json data and display in the console
  d3.json("./samples.json").then(function (data) { // d3.json('something') is a promise, .then we use a function to convert to a variable
    console.log('data', data);
    console.log('data.samples', data.samples);
    console.log('data.metadata', data.metadata);
    // let targetID = target;
    // let targetID = '940';

    // Filter data by selected Test Subject ID No.
    let filteredByTargetID = data.samples.filter(item => item.id === targetID);
    console.log('filteredByTargetID', filteredByTargetID);

    // D3 select Demographic Info and Dropdown options
    let metadataz = d3.select("#sample-metadata");
    let optionz = d3.select("#selDataset");

    // console.log('filteredByTargetID[0].id',filteredByTargetID[0].id);
    // console.log('data.metadata[0].id',data.metadata[0].id);
    // console.log('filteredByTargetID[0].id type',typeof parseInt(filteredByTargetID[0].id));
    // console.log('data.metadata[0].id type',typeof data.metadata[0].id.toString());

    // Reset dropdown options
    optionz.html("");
    let countz = 0;

    // Add dropdown options
    data.metadata.forEach(x => {
      optionz.append("option").text(`${x.id}`);
      countz += 1;
      // console.log(`${x.id}`);
    })

    // Count of dropdown options
    console.log(`countz is: `, countz);

    // Reset data in Demographic Info section
    metadataz.html("");

    washingFrequency_list = [];

    // Data added to Demographic Info section
    data.metadata.forEach(x => {
      if (x.id === parseInt(filteredByTargetID[0].id)) {
        metadataz.append("li").text(`ID: ${x.id}`);
        metadataz.append("li").text(`Ethnicity: ${x.ethnicity}`);
        metadataz.append("li").text(`Gender: ${x.gender}`);
        metadataz.append("li").text(`Age: ${x.age}`);
        metadataz.append("li").text(`Location: ${x.location}`);
        metadataz.append("li").text(`BBtype: ${x.bbtype}`);
        metadataz.append("li").text(`WFreq: ${x.wfreq}`);
        let washingFrequency = x.wfreq;
        console.log(`washingFrequency is: ${washingFrequency}`)
        washingFrequency_list.push(washingFrequency);
      }
    });

    console.log(`2washingFrequency is: ${washingFrequency_list[0]}`)

    // Slice the first 10 objects for plotting
    let topTenSampleValues = filteredByTargetID[0].sample_values.slice(0, 10);
    console.log('topTenSampleValues', topTenSampleValues);

    // let topTenOtuIDs = filteredByTargetID[0].otu_ids.slice(0,10).toString();
    let topTenOtuIDs = filteredByTargetID[0].otu_ids.slice(0, 10);
    console.log('topTenOtuIDs', topTenOtuIDs);

    topTenOtuIDz = [];

    for (let i = 0; i < topTenOtuIDs.length; i++) {
      topTenOtuIDz[i] = "OTU ";
      topTenOtuIDz[i] += topTenOtuIDs[i];
    }
    console.log('topTenOtuIDz after', topTenOtuIDz);

    let topTenOtuLabels = filteredByTargetID[0].otu_labels.slice(0, 10);
    console.log('topTenOtuLabels', topTenOtuLabels);

    let dropdownMenu = d3.select("selDataset");
    dropdownMenu.text(targetID);

    // Trace1 for the OTUs data
    let trace1 = {
      x: topTenSampleValues.reverse(),
      y: topTenOtuIDz.reverse(),
      text: topTenOtuLabels.reverse(),
      name: "OTU",
      type: "bar",
      orientation: "h",
      marker: {
        color: 'rgb(30,144,255)'
      }
    };

    // Data array
    let traceData = [trace1];

    // Apply a title to the layout
    let layout1 = {
      title: "Top 10 OTU IDs",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with the id "bar"
    Plotly.newPlot("bar", traceData, layout1);

    let sampleValues = filteredByTargetID[0].sample_values;
    let otuIDs = filteredByTargetID[0].otu_ids;
    let otuLabels = filteredByTargetID[0].otu_labels;

    let trace2 = {
      x: otuIDs,
      xaxis: { title: { text: 'OTU ID' } },
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: ['rgb(30, 144, 255)',
          'rgb(30, 144, 255)',
          'rgb(30, 144, 255)',
          'rgb(0, 128, 0)',
          'rgb(0, 128, 0)',
          'rgb(0, 128, 0)',
          'rgb(255, 103, 0)',
          'rgb(255, 103, 0)',
          'rgb(255, 103, 0)'],
        size: sampleValues
      }
    };

    let data2 = [trace2];

    let layout2 = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 1300
    };

    Plotly.newPlot('bubble', data2, layout2);

    let gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washingFrequency_list[0],
        title: { text: "Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: { axis: { visible: false, range: [0, 10] } }
      }
    ];

    let gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);

  });
};


// This function will be run on changes to the dropdown menu

function optionChanged(target) {
  // Select the json data and display in the console
  d3.json("./samples.json").then(function (data) { // d3.json('something') is a promise, .then we use a function to convert to a variable
    console.log('data', data);
    console.log('data.samples', data.samples);
    console.log('data.metadata', data.metadata);
    let targetID = target;

    // Filter data by selected Test Subject ID No.
    let filteredByTargetID = data.samples.filter(item => item.id === targetID);
    console.log('filteredByTargetID', filteredByTargetID);

    // D3 select Demographic Info and Dropdown options
    let metadataz = d3.select("#sample-metadata");
    let optionz = d3.select("#selDataset");

    // Reset data in Demographic Info section
    metadataz.html("");

    washingFrequency_list = [];

    // Data added to Demographic Info section
    data.metadata.forEach(x => {
      if (x.id === parseInt(filteredByTargetID[0].id)) {
        metadataz.append("li").text(`ID: ${x.id}`);
        metadataz.append("li").text(`Ethnicity: ${x.ethnicity}`);
        metadataz.append("li").text(`Gender: ${x.gender}`);
        metadataz.append("li").text(`Age: ${x.age}`);
        metadataz.append("li").text(`Location: ${x.location}`);
        metadataz.append("li").text(`BBtype: ${x.bbtype}`);
        metadataz.append("li").text(`WFreq: ${x.wfreq}`);
        let washingFrequency = x.wfreq;
        console.log(`washingFrequency is: ${washingFrequency}`)
        washingFrequency_list.push(washingFrequency);
      }
    });

    console.log(`2washingFrequency is: ${washingFrequency_list[0]}`)

    // Slice the first 10 objects for plotting
    let topTenSampleValues = filteredByTargetID[0].sample_values.slice(0, 10);
    console.log('topTenSampleValues', topTenSampleValues);

    // let topTenOtuIDs = filteredByTargetID[0].otu_ids.slice(0,10).toString();
    let topTenOtuIDs = filteredByTargetID[0].otu_ids.slice(0, 10);
    console.log('topTenOtuIDs', topTenOtuIDs);

    topTenOtuIDz = [];

    for (let i = 0; i < topTenOtuIDs.length; i++) {
      topTenOtuIDz[i] = "OTU ";
      topTenOtuIDz[i] += topTenOtuIDs[i];
    }
    console.log('topTenOtuIDz after', topTenOtuIDz);

    let topTenOtuLabels = filteredByTargetID[0].otu_labels.slice(0, 10);
    console.log('topTenOtuLabels', topTenOtuLabels);

    let dropdownMenu = d3.select("selDataset");
    dropdownMenu.text(target);

    // Trace1 for the OTUs data
    let trace1 = {
      x: topTenSampleValues.reverse(),
      y: topTenOtuIDz.reverse(),
      text: topTenOtuLabels.reverse(),
      name: "OTU",
      type: "bar",
      orientation: "h",
      marker: {
        color: 'rgb(30,144,255)'
      }
    };

    // Data array
    let traceData = [trace1];

    // Apply a title to the layout
    let layout1 = {
      title: "Top 10 OTU IDs",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with the id "bar"
    Plotly.newPlot("bar", traceData, layout1);

    let sampleValues = filteredByTargetID[0].sample_values;
    let otuIDs = filteredByTargetID[0].otu_ids;
    let otuLabels = filteredByTargetID[0].otu_labels;

    let trace2 = {
      x: otuIDs,
      xaxis: { title: { text: 'OTU ID' } },
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: ['rgb(30, 144, 255)',
          'rgb(30, 144, 255)',
          'rgb(30, 144, 255)',
          'rgb(0, 128, 0)',
          'rgb(0, 128, 0)',
          'rgb(0, 128, 0)',
          'rgb(255, 103, 0)',
          'rgb(255, 103, 0)',
          'rgb(255, 103, 0)'],
        size: sampleValues
      }
    };

    let data2 = [trace2];

    let layout2 = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 1300
    };

    Plotly.newPlot('bubble', data2, layout2);

    let gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washingFrequency_list[0],
        title: { text: "Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: { axis: { visible: false, range: [0, 10] } }
      }
    ];

    let gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);



  });
};

init();