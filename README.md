# improbable_beef_bacteria_investigation
- Create additional filters for the webpage. The advanced filtering capability will allow users to filter the data by multiple factors.

## Challenge Overview
- The goals of this challenge are to:
    - Create a bar chart of the top ten bacterial species in a volunteer’s navel. 
    - Create a bubble chart to visualize the relative frequency of all the bacterial species found in a volunteer’s navel.
    - Complete the demographic information panel.

# Link to completed dashboard required for the challenge:
- https://jwade688.github.io/improbable_beef_bacteria_investigation/

# Summary:
- The first part of the challenge was to fill out the metadata box for each user ID. To do this, I appended each metadata category to the PANEL variable. The next part was to save the necessary data needed for the two charts, sampleValues, otuIDs, otuLabels. Using this data I was able to pull the top 10 to create the bar chart. I also applied the variables to create the scatter plot. Finally, I added the guage plot. I went throught metadata again and pulled the wfreq value from the user. Once I had the metadata, 2 graphs, and gauge chart, I applied this code to the init function so that user 940, the first in the set of data, would appear when the page is loaded. 