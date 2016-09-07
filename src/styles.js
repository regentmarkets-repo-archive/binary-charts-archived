export const colorBg = (theme: Theme, percentage: number): string =>
    theme === 'light' ?
        `rgba(42, 48, 82, ${percentage})` :
        `rgba(242, 244, 255, ${percentage})`;

export const colorText = (theme: Theme, percentage: number): string =>
    colorBg(theme === 'light' ? 'dark' : 'light', percentage);

export default {
    timeFramePicker: {
        display: 'flex',
    },
    timeFrameButton: {
        flex: 1,
        background: 'transparent',
    },
    zoomControls: {
        position: 'relative',
        bottom: '5em',
        width: '100%',
        textAlign: 'center',
    },
    zoomButton: {
        cursor: 'pointer',
        borderRadius: '50px',
        border: '1px solid ' + colorBg('light', 0.75),
        background: colorBg('light', 0.25),
        // padding: '1em',
        height: '3em',
        width: '3em',
    },
};
