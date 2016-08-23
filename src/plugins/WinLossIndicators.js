import { wrap, Chart } from '../highcharts/highstock';

const initBand = ({ renderer, barrier, width, height }) =>
    renderer
        .rect(0, barrier, width, height)
        .attr({ fill: 'red', opacity: 0.75 })
        .add(bands.group);

const initialize = ({ bands, renderer }) => {
    bands.group = renderer.g(bands)
        .add();

    bands.winBand = initBand(renderer);
    bands.winLabel = renderer
        .label('WIN')
        .css({
            cursor: 'default',
            textAnchor: 'end',
            color: text,
        })
        .add(band.group);
};

const updateBand = ({ band }) => {
    band.animate({ y: y - 1, h: x + 5 });
};

const update = ({ contract }) => {
    bands.rect.attr({
        text: (+value).toFixed(pipSize),
    });

    bands.label.animate({
        text: 'LOSS',
    });
};

const renderBands = ({ chart }) => {
    const y = yAxis.toPixels(barrier) || 0;
    const updateFunc = yAxis[band] ? update : initialize;

    if (!yAxis[band]) {
        yAxis[band] = {};
    }

    updateFunc({
        renderer: chart.renderer,
    });
};

const renderWinLossBands = chart => {
    const { contract } = chart.userOptions.binary;

    renderBands({ chart });
};

export default () => {
    wrap(Chart.prototype, 'init', function init(proceed, ...args) {
        proceed.apply(this, args);
        renderWinLossBands(this);
    });

    wrap(Chart.prototype, 'redraw', function redraw(proceed, ...args) {
        proceed.apply(this, args);
        renderWinLossBands(this);
    });
};
