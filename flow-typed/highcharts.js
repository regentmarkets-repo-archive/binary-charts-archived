declare module 'highcharts/highstock' {
    declare class Chart {

    }

    declare function StockChart(renderTo: string | Node, options: any, callback: (chart: Chart) => void): Chart;

    declare function merge(a: Object, b: Object): Object;

    declare function wrap(
        parent: Object,
        functionName: string,
        replacementFunc: (replacementFunc: () => Object) => void
    ): Object;
}

declare module 'highcharts/modules/exporting' {
    declare function exporting(highcharts: any): void;
}
