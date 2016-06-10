import { wrap, Chart } from 'highcharts/highstock';

export default () => {
    wrap(Chart.prototype, 'showLoading', function(proceed, ...args) {
        this.isLoading = true;
        proceed.apply(this, args);
    });

    wrap(Chart.prototype, 'hideLoading', function(proceed, ...args) {
        this.isLoading = false;
        proceed.apply(this, args);
    });
}
