import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import TypeSwitchChart from './TypeSwitchableChart';
import DynamicOHLCChart from './DynamicOHLCChart';

const rawData =  [
    {
        open: "679.4281",
        high: "679.4775",
        epoch: 1463124120,
        close: "678.7481",
        low: "678.7481"
    },
    {
        open: "678.6963",
        high: "678.8076",
        epoch: 1463124180,
        close: "678.7713",
        low: "678.4483"
    },
    {
        open: "678.6932",
        high: "678.9117",
        epoch: 1463124240,
        close: "678.8343",
        low: "678.4627"
    },
    {
        open: "678.7753",
        high: "678.9604",
        epoch: 1463124300,
        close: "678.5708",
        low: "678.5708"
    },
    {
        open: "678.5561",
        high: "678.5561",
        epoch: 1463124360,
        close: "677.7866",
        low: "677.7856"
    },
    {
        open: "677.7319",
        high: "678.4892",
        epoch: 1463124420,
        close: "678.4892",
        low: "677.5329"
    },
    {
        open: "678.5515",
        high: "678.9484",
        epoch: 1463124480,
        close: "678.6134",
        low: "678.2752"
    },
    {
        open: "678.7594",
        high: "678.8916",
        epoch: 1463124540,
        close: "678.7289",
        low: "678.4427"
    },
    {
        open: "678.7152",
        high: "678.7618",
        epoch: 1463124600,
        close: "678.748",
        low: "678.326"
    },
    {
        open: "678.7806",
        high: "679.4404",
        epoch: 1463124660,
        close: "679.2154",
        low: "678.7806"
    }
];
export const convertEpochToMS = dataArr => dataArr.map(d => Object.assign(d, { epoch: d.epoch * 1000 }));

storiesOf('OHLC', module)
    .add('Simple OHLC chart', () =>
        <BinaryChart type="candles" ticks={convertEpochToMS(rawData)} />
    )
    .add('Combine with live-api', () => {

        return (
            <TypeSwitchChart />
        );
    })
    .add('OHLC streaming', () =>
        <DynamicOHLCChart />
    )
;
