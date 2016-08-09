import React, { Component } from 'react';
import BinaryChart from '../../src/BinaryChart';
import ticks from '../ticks';

const randomNum = () => Math.random() * (20 - 10) + 10;
// const seqDate = () => new Date().getTime() / 10;
const testData = () =>
    [6,5,4,3,2,1].map(i => {
        const epoch = (new Date().getTime() / 1000) - i;
        return { epoch, quote: randomNum() };
    });

export default class DynamicChart extends Component {

     constructor(props) {
         super(props);
         this.state = {
             ticks: testData(),
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
             <BinaryChart id="dynamic-tick" ticks={ticks} {...this.props} />
         );
     }
 }
