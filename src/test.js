import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import TradeChart from './TradeChart';

const randomNum = () => Math.floor(Math.random() * (20 - 10) + 10);
const testData = [
    [2, randomNum()],
    [4, randomNum()],
    [6, randomNum()],
    [8, randomNum()],
    [9, randomNum()],
    [10, randomNum()],
    [11, randomNum()],
    [15, randomNum()],
    [19, randomNum()],
    [20, randomNum()],
    [26, randomNum()]
];


class TestContainer extends Component {

     constructor(props) {
         super(props);
         this.state = {
             ticks: testData.map(x => ({ epoch: x[0], quote: x[1] }))
         }
     }

     componentDidMount() {
         setInterval(() => {
             const { ticks } = this.state;
             const newTick = { epoch: ticks.length * 3, quote: randomNum() };
             this.setState({
                 ticks: ticks.concat([newTick])
             })
         }, 1000);
     }

     render() {
         const { ticks } = this.state;

         return <TradeChart ticks={ticks}/>;
     }
 }

 ReactDOM.render(<TestContainer />, document.getElementById('trade-chart'));
