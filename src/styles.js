export const colorBg = (theme: Theme, percentage: number): string =>
    theme === 'light' ?
        `rgba(42, 48, 82, ${percentage})` :
        `rgba(242, 244, 255, ${percentage})`;

export const colorText = (theme: Theme, percentage: number): string =>
    colorBg(theme === 'light' ? 'dark' : 'light', percentage);

export default {
    toolbar: {
        display: 'flex',
    },
    pickerButton: {
        cursor: 'pointer',
        height: 30,
    },
    pickerItem: {
        cursor: 'pointer',
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
        padding: 8,
        margin: '0 2px',
        height: 40,
        width: 40,
    },
    zoomSpacer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    submenu: {
        position: 'absolute',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
    },
};
