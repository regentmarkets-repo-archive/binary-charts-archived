## High-level design principles

### Time Frame controls

* For now is 'stateless', we do not care or display that the user selected '1 day' as it is temporary (consistent with most other charts)
* Determine the maximum data that will be loaded and shown.
* Minimum time frame can be short, as we have tick trades
* Log durations should also be possible, maybe up to an year?
* MAX should be dynamic and has some predetermined value
* On each change new data should be requested (could be cached later)
* Interval might change when changing Time Frame (needs discussing)

### Interval controls

* An interval can be set or not
* For line/area there should not be any interval set (maybe there can be later?)
* For candles/ohlc an interval is needed
* Some predefined intervals are available in the API, we definitely do not need all of theme
* Short intervals like 10 and 20 seconds are likely not a bad idea, for tick trades, IQOption and ExpertOption do have them as Short
* Minimum granularity supported by API is 60 seconds, if we decide to go lower, need to calculate it from ticks

### Zoom In / Out & Focus

* Zoom In focuses on the right half of currently visible data
* Zoom Out focuses expands to show double the amount of data currently shown
* Focus moves to the end of data, thus including the 'now' tick
* Focus can be hidden if visible data window is to the right
* Minimum of 5 candles and 20-30 ticks should be shown on screen
* Maximum of 100 candles and 500 ticks should be shown on screen (values can be tweaked)

### Crosshairs

* Can be turned on or off
* May snap to values on any or both axis, will be hardcoded to do or not do so and will not be user selectable
* Most charts do not follow the cursor with their tooltip with data, we should do something about it, maybe crosshair follows, when off it doesn't?

### Navigation

* User can navigate by dragging the chart via mouse, touchpad or touch on mobile device
* User can zoom in/out via controls or via touch on mobile & touchpad
* If zoomed out too much we might decide to load more data

### Indicators

* One or more indicators can be added to the chart
* More than one indicator of the same type can be added
* Indicators can be configured or removed
* All computations for the indicators are contained in [binary-indicators](https://github.com/borisyankov/binary-indicators)
* Many indicators need data before the first item shown, they are an aggregate, for example SMA20 needs 19 data points before current one

### X and Y extremes

* Our goal will be to keep Highcharts fully in control
* Y extremes depend on data, barriers and margins from the edges
* X extremes depend on data, time entries, especially forward starting date which is always outside of data, and possible margins
* While dragging the chart around, these extremes should dynamically update

### Templates || Presets

* User can save current chart configuration as template/preset
* At any point, the user can load or delete existing templates
* Saved settings are: chart type, duration, interval, indicators

### Trading Times

* Indicators for Open, Close, Settlement times are displayed on the chart
* Might be better served as plot bands that show Close times in gray
* We need better ways to get and provide multi-day trading times indication (API currently does not support this)

### Axises

* The amount of ticks on each axis is important
* The time labels on the X axis need to correctly communicate the information, if multiple days spanned, this should be shown (by having whole day labels, several not all)
* They always need to use the correct pip size

### Vertical time indicators
* Indicate contract times
* Can be different colors for different types
* Might have extra label on the X axis to show their exact time

### Other considerations

* Behavior should remember state whenever possible
* When switching chart types, data should look very similar (same shapes, same time frame etc.)
* At any time there should be some data on screen, not too much, not too little
