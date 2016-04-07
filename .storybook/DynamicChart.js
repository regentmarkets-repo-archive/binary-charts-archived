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
         this.chartUpdate = setInterval(() => {
             const { ticks } = this.state;
             const newTick = { epoch: new Date().getTime() / 1000, quote: randomNum() };
             this.setState({
                 ticks: ticks.concat([newTick]),
             });
         }, 1000);
         window.stopUpdates = () => clearInterval(this.chartUpdate);
     }

     componentWillUnmount() {
         clearInterval(this.chartUpdate);
     }

     render() {
         const { ticks } = this.state;

         return (
             <BinaryChart ticks={ticks} {...this.props} />
         );
     }
 }
