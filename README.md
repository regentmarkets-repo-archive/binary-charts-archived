# Binary Charts

[![Build Status](https://travis-ci.org/binary-com/binary-charts.svg?branch=master)](https://travis-ci.org/binary-com/binary-charts)
[![Coverage Status](https://coveralls.io/repos/github/binary-com/binary-charts/badge.svg?branch=master)](https://coveralls.io/github/binary-com/binary-charts?branch=master)
[![Code Climate](https://codeclimate.com/github/binary-com/binary-charts/badges/gpa.svg)](https://codeclimate.com/github/binary-com/binary-charts)

[Demos](https://binary-com.github.io/binary-charts/)

## Install by running:

```
npm install binary-charts --save
```

Or by including the file via CDN and a script tag:

```
<script src="https://npmcdn.com/binary-charts@3.16.0/lib/binary-charts.js"></script>
```

## See Demos

```
npm install
npm start
open localhost:9001
```

## Build

To build the project:

```
npm install
npm run compile
```

To run unit tests:

```
npm test
```

For live rebuild during development:
```
webpack --watch
open example/index.html
```

## Usage

Install in your project:

```
npm i binary-charts --save
```

Render the component and pass ticks array to visualize:

```
<BinaryCharts ticks={ticks} />
```

Ticks array is in a format [{ epoch, quote }]. Like:

```
var ticks = [
    { epoch: 123, quote: 95.4 },
    { epoch: 124, quote: 95.3 },
    { epoch: 125, quote: 95.6 }
];
```

## API
| Props | Default | Description |
 -------|---------|-------------
 symbol | N/A     | string represent symbol of data, eg. 'R_100'
 ticks  | [ ]      | data for charts, can be in ticks structure or ohlc structure, check below for data shape
 contract | N/A   | description of a bought contract, check response of https://developers.binary.com/api/#proposal_open_contract
 rangeChange | N/A | function with signature `(count, type) => undefined`, called when user clicked one of the range selector buttons, useful when library client want to load more data when user click those buttons
 type | 'area' | can be either `area` or `candlestick`, defines chart type
 typeChange | N/A | function with signature `(type) => undefined`, called when user change chart type **WIP**
 trade | N/A | an object describe proposal that user might want to buy, check request of https://developers.binary.com/api/#proposal
 trading times | N/A | trading times of symbol, check https://developers.binary.com/api/#trading_times

## Ticks data structure
TICKS:
```
[
    {
        epoch: number,
        quote: number
    },
    ...
]
```

OHLC:
```
[
    {
        epoch: number,
        open: number,
        high: number,
        low: number,
        close: number,
    },
    ...
]
```


## Contract visualization

The component can optionally display the trade parameters or contract already bought.

```
<BinaryCharts ticks={ticks} trade={trade} />
```
or

```
<BinaryCharts ticks={ticks} contract={contract} />
```

Trade and contract properties have the exact format as accepted or returned by the API.

## Trading Times

<BinaryCharts ticks={ticks} tradingTimes={tradingTimes} />

You can optionally provide a trading times object and the Chart will display plot lines visialising open, close and settlement times.

## Dynamic data

Dynamically loading more data when needed by the chart will be available soon.

## Usage outside React projects

The project is currently lightly dependent on React, but will soon be usable without it. Until then, you can integrate a React component in non-React project like this:

[React components as jQuery plugins](http://swizec.com/blog/using-react-in-the-real-world/swizec/6710)

[Integrating React.js into Existing jQuery Web Applications](http://winterbe.com/posts/2015/08/24/integrate-reactjs-into-jquery-webapps/)
