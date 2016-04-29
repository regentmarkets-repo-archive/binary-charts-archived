export default ({ rangeChange = () => undefined }) => ({
    setExtremes: e => {
        if (e.rangeSelectorButton) {
            const { count, type } = e.rangeSelectorButton;
            rangeChange(count, type);
        }
    },
});
