Assumptions made in chart

1. Client never pass only 1 data point into the chart, this assumption result in the fact that we perform auto-shift
with the assumption chart already have an array of data.


## Things to take note

1. Call all update function as little as possible, to reduce CPU usage, as in dynamic chart, update tends to be called a lot
2. Avoid addSeries in high frequency, prefer pre-initialize empty series, and setData on it
3.
