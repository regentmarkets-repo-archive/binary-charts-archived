import getLastTick from 'binary-utils/lib/getLastTick';

export default (axis, ticks, contract) => {
    const tickMin = ticks[0] && ticks[0].epoch;
    const contractMin = contract && (+contract.entry_spot / 1000);
    const extremesMin = [tickMin, contractMin].filter(x => x);
    const min = Math.min(extremesMin);

    const tickMax = getLastTick(ticks).epoch;
    const contractMax = contract && (+contract.expiry_time / 1000);
    const extremesMax = [tickMax, contractMax].filter(x => x);
    const max = Math.max(extremesMax);

    axis.setExtremes(min, max);
};
