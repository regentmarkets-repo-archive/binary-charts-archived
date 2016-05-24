export default ({ trade, contract, lastTick }) => {
    if (contract) {
        return contract;
    }

    if (!trade) {
        return undefined;
    }

    const cloned = Object.assign({}, trade);
    let { barrier, barrier2, barrierType } = trade;

    if (!barrier) {
        cloned.barrier = lastTick;
    } else if (barrierType === 'relative') {
        barrier = +(barrier) + lastTick;
        barrier2 = +(barrier2) + lastTick;
    }

    if (barrier && barrier2) {
        delete cloned.barrier;
        cloned.low_barrier = barrier2;
        cloned.high_barrier = barrier;
    }

    return cloned;
};
