const createZoom = (type, orient, zoomLock, x, y) => ({
    type,
    orient,
    zoomLock,
    start: 50,
    end: 100,
    xAxisIndex: x,
    yAxisIndex: y,
});

export const createZoomInside = () => createZoom('inside', 'horizontal', false, 0, null);
export const createSlideInside = () => createZoom('inside', 'horizontal', true, 0, null);

export const createZoomSlider = () => createZoom('slider', 'horizontal', false, 0, null);
export const createSlider = () => createZoom('slider', 'horizontal', true, 0, null);

export const createDefaultDataZoom = () => [
    createZoomInside(),
    createZoomSlider(),
];
