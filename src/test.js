import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import BinaryChart from './BinaryChart';

const randomNum = () => Math.random() * (200 - 100) + 100;
const seqDate = () => new Date().getTime() / 100;
const testData = [];


class TestContainer extends Component {

     constructor(props) {
         super(props);
         this.state = {
             ticks: testData.map(x => ({ epoch: x[0], quote: x[1] }))
         }
     }

     componentDidMount() {
         const chartInterval = setInterval(() => {
             const { ticks } = this.state;
             const newTick = { epoch: new Date().getTime() / 1000, quote: randomNum() };
             this.setState({
                 ticks: ticks.concat([newTick])
             })
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

         const trade = {
             type: 'ASIANU',
             barrier: 150,
         };

         return (
             <div>
                 <h1>Ticks</h1>
                 <BinaryChart ticks={ticks} />
                 <h1>Trade</h1>
                 <BinaryChart ticks={ticks} trade={trade} />
                 <h1>Contract</h1>
                 <BinaryChart ticks={ticks} contract={contract} />
                 <h1>Empty</h1>
                 <BinaryChart />
             </div>
         );
     }
 }

 ReactDOM.render(<TestContainer />, document.getElementById('trade-chart'));
