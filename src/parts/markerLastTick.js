export default (data) => {
    if (!data.length) return;

    const lastTick = data[data.length - 1];
    data[data.length - 1] = {
        x: lastTick[0],
        y: lastTick[0],
        marker: { radius: 50 }
    };
}
