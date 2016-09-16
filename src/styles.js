export const colorBg = (theme: Theme, percentage: number): string =>
    theme === 'light' ?
        `rgba(42, 48, 82, ${percentage})` :
        `rgba(242, 244, 255, ${percentage})`;

export const colorText = (theme: Theme, percentage: number): string =>
    colorBg(theme === 'light' ? 'dark' : 'light', percentage);

export default {
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    toolbar: {
        display: 'flex',
        marginBottom: 4,
    },
    pickerButton: {
        cursor: 'pointer',
        height: '100%',
    },
    pickerItem: {
        cursor: 'pointer',
    },
    chartCore: {
        flex: 1,
    },
    timeFramePicker: {
        display: 'flex',
    },
    timeFrameButton: {
        flex: 1,
        background: 'transparent',
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
