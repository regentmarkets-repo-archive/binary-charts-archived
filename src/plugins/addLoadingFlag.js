import { wrap, Chart } from 'highcharts/highstock';

export default () => {
    wrap(Chart.prototype, 'showLoading', function showLoading(proceed, ...args) {
        this.isLoading = true;
        proceed.apply(this, args);
    });

    wrap(Chart.prototype, 'hideLoading', function hideLoading(proceed, ...args) {
        this.isLoading = false;
        proceed.apply(this, args);
    });
};
