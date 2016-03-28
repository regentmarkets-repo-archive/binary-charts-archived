# Binary Charts

[![Build Status](https://travis-ci.org/binary-com/binary-charts.svg?branch=master)](https://travis-ci.org/binary-com/binary-charts)


## Install by running:

```
npm install binary-charts --save
```

Or by including the file via CDN and a script tag:

```
<script src="https://npmcdn.com/binary-charts@3.16.0/lib/binary-charts.js"></script>
```

## Usage

Just include the component and pass ticks array to visualize:

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

## Dynamic data

Dynamically loading more data when needed by the chart will be available soon.
