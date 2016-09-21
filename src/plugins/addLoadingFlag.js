// $FlowFixMe
import { wrap, Chart } from 'highcharts/highstock.src';

export default () => {
    wrap(Chart.prototype, 'showLoading', function showLoading(proceed, ...args) {
        if (Object.keys(this).length === 0) return;
        proceed.apply(this, args);
        this.isLoading = true;
    });

    wrap(Chart.prototype, 'hideLoading', function hideLoading(proceed, ...args) {
        proceed.apply(this, args);
        this.isLoading = false;
    });
};
