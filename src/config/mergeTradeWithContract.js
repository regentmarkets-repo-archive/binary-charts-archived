export default ({ trade, contract, lastTick }) => {
    if (contract) {
        return contract;
    }

    if (!trade) {
        return undefined;
    }

    const cloned = Object.assign({}, trade);
    let { barrier, barrier2, barrierType } = trade;

    // clear all barrier
    delete cloned.barrier;
    delete cloned.barrier2;
    delete cloned.low_barrier;
    delete cloned.high_barrier;

    if (!barrier) {                                 //  if trade do not have barrier, default to last tick
        cloned.barrier = lastTick;
    } else if (barrierType === 'relative') {        // for relative, transform to absolute
        const computedBarrier1 = +(barrier) + lastTick;
        const computedBarrier2 = +(barrier2) + lastTick;

        if (barrier && barrier2) {
            cloned.low_barrier = computedBarrier2;
            cloned.high_barrier = computedBarrier1;
        } else if (!barrier2) {
            cloned.barrier = computedBarrier1;
        }
    }

    return cloned;
};
