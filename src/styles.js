export const colorBg = (theme: Theme, percentage: number): string =>
    theme === 'light' ?
        `rgba(42, 48, 82, ${percentage})` :
        `rgba(245, 247, 255, ${percentage})`;

export const colorText = (theme: Theme, percentage: number): string =>
    colorBg(theme === 'light' ? 'dark' : 'light', percentage);

export default {
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    toolbar: {
        display: 'flex',
    },
    pickerButton: {
        cursor: 'pointer',
    },
    pickerItem: {
        cursor: 'pointer',
    },
    chartCore: {
        flex: 1,
    },
    infobar: {
        position: 'absolute',
        marginTop: 40,
        marginLeft: 5,
        zIndex: 80,
        pointerEvents: 'none',
    },
    timeFramePicker: {
        display: 'flex',
    },
    timeFrameButton: {
        flex: 1,
    },
    zoomControls: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        marginTop: -70,
        height: 30,
        marginBottom: 40,
        width: '100%',
        textAlign: 'center',
    },
    zoomButton: {
        cursor: 'pointer',
        boxSizing: 'border-box',
        borderRadius: '50px',
        background: colorBg('light', 0.25),
        padding: 4,
        margin: '0 2px',
        height: 32,
        width: 32,
    },
    zoomSpacer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    submenu: {
        position: 'absolute',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
    },
};

export const indicatorColors = {
    sma: '#A31A48',
    ema: '#7DB4B5',
    bb: '#AA8C14',
};
