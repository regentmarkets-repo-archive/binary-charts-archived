
# Props of BinaryChart

props name is suffixed with `*` if it's required

------

### ticks*

|   |   |
|---|---|
Type        | Array of { epoch, quote } or { epoch, open, high, low, close }, all keys are number
Default     | []

__Description__
 - Data to be shown on chart, allow 2 different data structure, need to be in sync with `type` property

-----

### type*

|   |   |
|---|---|
Type        | One of `line, area, candlestick, ohlc`
Default     | 'area'

__Description__
* `area` and `line` require data structre of { epoch, quote },
* 'candlestick` and 'ohlc' require data structure of { epoch, open, high, low, close }

-----

### contract

|   |   |
|---|---|
Type        | Object, most properties can be found https://developers.binary.com/api/#proposal_open_contract
Default     | N/A


Details of contract object

Key             | type                              | description
---             | ----                              | -----------
barrier         | number                            | value of 1st barrier
barrier_count   | number                            | number of barriers
low_barrier     | number                            | lower barrier of contract
high_barrier    | number                            | higher barrier of contract
barrierType     | {'absolute', 'relative', 'digit'} | This is not obtained from api, user need to supply manually to indicate types of barrier, default to `relative`
contract_type   | string                            | Eg. CALL, PUT, TOUCHONE, EXPIRYMISS etc, affect how barriers is interpreted and rendered
date_expiry     | epoch                             | a straight line will be render on this timestamp as Expiry Time
date_start      | epoch                             | a straight line will be render on this timestamp as Start Time
entry_tick_time | epoch                             | a straight line will be render on this timestamp as Entry Spot Time
exit_tick_time  | epoch                             | a straight line will be render on this timestamp as Exit Spot Time
purchase_time   | epoch                             | a straight line will be render on this timestamp if it differ from both start_time and entry_tick_time
sell_time       | epoch                             | a straight line will be render on this timestamp as Exit Spot Time in case where contract is sold before expire

__Description__
- barrier exist when contract require only 1 barrier, eg. RISE/FALL, TOUCH/NOTOUCH
- low_barrier and high_barrier is used when contract require 2 barriers, eg. ENDS IN, STAYS OUTSIDE
- chart will use contract to extract barriers, if contract is absent, it will try extract barriers from `trade` properties

-----

### trade

|   |   |
|---|---|
Type | Object, most properties can be found https://developers.binary.com/api/#proposal
Default | N/A

Details of trade object

Key             | type                              | description
---             | ----                              | -----------
barrier         | number                            | value of 1st barrier
barrier2        | number                            | value of 2nd barrier (if any)
barrierType     | {'absolute', 'relative', 'digit'} | This is not obtained from api, user need to supply manually to indicate types of barrier, default to `relative`


Description:
- barrier2 refers to low_barrier in contract
- barrier refer to high_barrier in contract

-----


### events
|   |   |
|---|---|
Type        | Array of { type: 'event name', handler: (chart) => void }
Default     | []

__Description__

This prop allow user to interact with chart imperatively, by emitting Event to the DOM containing the chart.

__Example__

```
const eventsList = [{ type: 'print', handler: chart => console.log(chart.options) }];

ReactDOM.render(
    <BinaryChart events={eventsList} />, document.getElementById('chart')
);

document.getElementById('chart').dispatchEvent(new Event('print'));
// this will print the chart options in console

```

-------

### id
|   |   |
|---|---|
Type        | string
Default     | N/A
__Description__

The id of chart component in DOM, it is useful in case you need to access dom directly, also to be used together with events
It only refers to the chart component, does not include toolbars

-----


### getData

|   |   |
|---|---|
Type        | Function with signature (start: Epoch, end: Epoch, type: 'ticks' | 'candles', interval?: Epoch) => Promise
Default     | () => Promise.resolve()


__Description__

This is a method that supposed to fetch data from data source, it will be invoked when
* changing to a chart type that require different data, eg from line chart to candlestick chart
* change interval, as 1 minute data and 5 minute data is different
* when shifting to end of existing old data using Zoom Control, chart will interpret user want to view older data that is not available, thus call `getData` to fetch more

------

### noData
|   |   |
|---|---|
Type        | boolean
Default     | false

__Description__

When set to true, chart will ignore `ticks` property and show `Data not available`

------

### onTypeChange*
|   |   |
|---|---|
Type        | Function, signature: (chartType: string) => void
Default     | N/A
__Description__

Callback function that get called whenever user change chart type through the ChartTypePicker control,
typical usage is to change chart type


------

### assetName?
|   |   |
|---|---|
Type        | string
Default     | N/A
__Description__

Name of asset/underlying/symbol, will be show on tooltip when hover

------

### allowOHLC
|   |   |
|---|---|
Type        | boolean
Default     | true
__Description__

if true, will allow user to change chart type to candlestick or OHLC bar


-------

### pipSize*
|   |   |
|---|---|
Type        | number
Default     | 0
__Description__

This affect decimal places of data to be shown


-------

### shiftMode
|   |   |
|---|---|
Type        | can only be either 'fixed' or 'dynamic'
Default     | 'fixed'
__Description__

* when set to `fixed`, chart appear to `move` toward Right Hand Side when new data is added
* when set to `dynamic`, chart appear to `expand` toward Right Hand Side when new data is added



-------

### className
|   |   |
|---|---|
Type        | string
Default     | N/A
__Description__

Class name for the whole container dom, including toolbar, used to allow styling

-------

### hideTimeFrame
|   |   |
|---|---|
Type        | boolean
Default     | false
__Description__

Set to true to hide TimeFramePicker which appear at the bottom of chart

-------

### hideIntervalPicker
|   |   |
|---|---|
Type        | boolean
Default     | false
__Description__

Set to true to hide IntervalPicker

-------

### hideToolbar
|   |   |
|---|---|
Type        | boolean
Default     | false
__Description__

Set to true to hide the whole toolbar, which appear on top of the chart

-------

### hideZoomControls
|   |   |
|---|---|
Type        | boolean
Default     | false
__Description__

Set to true to hide the zoom control, which appear inside the chart when mouse hover

-------
