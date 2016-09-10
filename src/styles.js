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
        width: '1.5em',
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
        marginTop: -72,
        marginBottom: 36,
        width: '100%',
        textAlign: 'center',
    },
    zoomButton: {
        cursor: 'pointer',
        borderRadius: '50px',
        background: colorBg('light', 0.25),
        padding: 8,
        margin: 2,
        height: 24,
        width: 24,
    },
};
