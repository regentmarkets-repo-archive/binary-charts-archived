const createZoom = (type, orient, zoomLock = false) => ({
    type,
    orient,
    zoomLock,
    start: 0,
    end: 100,
    realtime: true,
});

export const createZoomInside = () => createZoom('inside', 'horizontal', false);
export const createSlideInside = () => createZoom('inside', 'horizontal', true);

export const createZoomSlider = () => createZoom('slider', 'horizontal', false);
export const createSlider = () => createZoom('slider', 'horizontal', true);

export const createDefaultDataZoom = () => [
    createZoomInside(),
    createZoomSlider(),
];
