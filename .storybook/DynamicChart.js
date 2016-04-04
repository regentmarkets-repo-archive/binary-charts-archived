import React, { Component } from 'react';
import BinaryChart from '../src/BinaryChart';

const randomNum = () => Math.random() * (20 - 10) + 10;
// const seqDate = () => new Date().getTime() / 10;
const testData = [];


export default class DynamicChart extends Component {

     constructor(props) {
         super(props);
         this.state = {
             ticks: testData.map(x => ({ epoch: x[0], quote: x[1] })),
         };
     }

     componentDidMount() {
         const chartInterval = setInterval(() => {
             const { ticks } = this.state;
             const newTick = { epoch: new Date().getTime() / 1000, quote: randomNum() };
             this.setState({
                 ticks: Math.round(newTick.epoch) % 10 === 0 ? (ticks || []).concat([newTick]) : undefined,
             });
         }, 1000);
         window.stopUpdates = () => clearInterval(chartInterval);
     }

     render() {
         const { ticks } = this.state;

         const contract = {
             contract_type: 'UPORDOWN',
             barrier: 150,
             barrier2: 180,
             date_expiry: new Date().getTime() / 1000 + 10,
             date_settlement: new Date().getTime() / 1000 + 11,
             date_start: new Date().getTime() / 1000 - 3,
             entry_tick_time: new Date().getTime() / 1000 + 2,
             expiry_time: new Date().getTime() / 1000 + 1,
         };

        //  const staysInTrade = {
        //      type: 'RANGE',
        //      barrier: 2,
        //      barrier2: -1.5
        //  };

         const higherTrade = {
             type: 'CALL',
             barrier: 2,
         };

         return (
             <div>
                <BinaryChart ticks={ticks} trade={contract} />
{/*
                 <h1>Ticks</h1>
                 <BinaryChart ticks={ticks} />
                 <h1>Trade</h1>
                 <BinaryChart ticks={ticks} trade={higherTrade} />
                 <h1>Contract</h1>
                 <BinaryChart ticks={ticks} contract={contract} />
                 <h1>Empty</h1>
                 <BinaryChart />*/}
             </div>
         );
     }
 }
