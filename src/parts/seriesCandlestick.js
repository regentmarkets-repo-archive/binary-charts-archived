export default data => [{
    type: 'candlestick',
    name: 'AAPL Stock Price',
    data: data,
    dataGrouping: {
        units: [
            ['week',
                [1]
            ], [
                'month', [1, 2, 3, 4, 6]
            ]
        ]
    }
}];
