// function to populate dropdown and initial page load
function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
      console.log(data);
      
      // Populate dropdown
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      
      // Populate the initial info panel
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == 940);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
      
      PANEL.html("");
      PANEL.append("h6").text("ID: " + result.id);
      PANEL.append("h6").text("Ethnicity: " + result.ethnicity);
      PANEL.append("h6").text("Gender: " + result.gender);
      PANEL.append("h6").text("Age: " + result.age);
      PANEL.append("h6").text("Location: " + result.location);
      PANEL.append("h6").text("BBType: " + result.bbtype);
      PANEL.append("h6").text("WFreq: " + result.wfreq);
      });
      
      // Pull data for inital load ID 940
      var samples = data.samples;
      var sampleArray = samples.filter(sampleObj => sampleObj.id == 940);

      // Pull data for bar chart
      var sampleValues = sampleArray[0].sample_values;
      var otuIDs = sampleArray[0].otu_ids;
      var otuLabels = sampleArray[0].otu_labels;
      
      // Guage chart
      var metadata2 = data.metadata;
      var resultArray2 = metadata2.filter(sampleObj => sampleObj.id == 940);
      var wfreqNumber = resultArray2[0].wfreq
      console.log(wfreqNumber);

      var gaugeTrace = {
        value: wfreqNumber,
        title: {text: "Navel wash frequency"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {range: [null, 9]},
        }
      };
      var gaugeData = [gaugeTrace]

      Plotly.newPlot("gauge", gaugeData) 
      
      // Initial Bar chart
      var trace = {
        x: sampleValues.slice(0,10).reverse(),
        y: otuIDs.slice(0,10),
        text: otuLabels.slice(0,10),
        type: "bar",
        "orientation": "h"
      };
      var data = [trace];
      var layout = {
        title: "Top ten bacterial species in a volunteer’s navel.",
        xaxis: {title: "Navel sample values"},
        yaxis: {title: "OTU ID", type: "category"}
      };
      Plotly.newPlot("bar", data, layout);
    
      // Initial Bubble plot
      var trace = {
        x: otuIDs,
        y: sampleValues,
        marker: {
          size: sampleValues,
          color: otuIDs,
          colorscale: "Portland"
        },
        text: otuLabels,
        mode: "markers",
        "orientation": "h"
      };
      var data = [trace];
      var layout = {
        title: "Relative frequency of bacterial species found in volunteer’s navel",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample values"}
      };
      Plotly.newPlot("bubble", data, layout);
    });
  }

// Call init to load when page loads
init();

// What to do when dropdown is changed
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

// Metadata population
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text("ID: " + result.id);
      PANEL.append("h6").text("Ethnicity: " + result.ethnicity);
      PANEL.append("h6").text("Gender: " + result.gender);
      PANEL.append("h6").text("Age: " + result.age);
      PANEL.append("h6").text("Location: " + result.location);
      PANEL.append("h6").text("BBType: " + result.bbtype);
      PANEL.append("h6").text("WFreq: " + result.wfreq);
    });
  }

// Function to build the charts
function buildCharts(sample) {
  
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);

    // Guage chart
    var metadata2 = data.metadata;
    var resultArray2 = metadata2.filter(sampleObj => sampleObj.id == sample);
    var wfreqNumber = resultArray2[0].wfreq
    console.log(wfreqNumber);

    var gaugeTrace = {
      value: wfreqNumber,
      title: {text: "Navel wash frequency"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [null, 9]},
      }
    };
    var gaugeData = [gaugeTrace]

    Plotly.newPlot("gauge", gaugeData) 

    // Pull data for bar chart
    var sampleValues = sampleArray[0].sample_values;
    var otuIDs = sampleArray[0].otu_ids;
    var otuLabels = sampleArray[0].otu_labels;

    // Bar chart
    var trace = {
      x: sampleValues.slice(0,10).reverse(),
      y: otuIDs.slice(0,10),
      text: otuLabels.slice(0,10),
      type: "bar",
      "orientation": "h"
    };
    var data = [trace];
    var layout = {
      title: "Top ten bacterial species in a volunteer’s navel.",
      xaxis: {title: "Navel sample values"},
      yaxis: {title: "OTU ID", type: "category"}
    };
    Plotly.newPlot("bar", data, layout);

    // Bubble plot
    var trace = {
      x: otuIDs,
      y: sampleValues,
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: "Portland"
      },
      text: otuLabels,
      mode: "markers",
      "orientation": "h"
    };
    var data = [trace];
    var layout = {
      title: "Relative frequency of bacterial species found in volunteer’s navel",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Sample values"}
    };
    Plotly.newPlot("bubble", data, layout);
  });
}