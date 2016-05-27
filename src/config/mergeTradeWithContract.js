// TODO: improve this into an adapter that transform messy server data into cleaner data for internal use
export default ({ trade, contract, lastTick }) => {
    if (contract) {
        const cloned = Object.assign({}, contract);
        const { barrier, low_barrier, high_barrier } = contract;
        if (barrier) {
            cloned.barrier = +barrier;
            return cloned;
        }

        if (low_barrier && high_barrier) {          // eslint-disable-line camelcase
            cloned.low_barrier = +low_barrier;      // eslint-disable-line camelcase
            cloned.high_barrer = +high_barrier;     // eslint-disable-line camelcase
            return cloned;
        }

        cloned.barrier = +lastTick;
        return cloned;
    }

    if (!trade) {
        return;
    }

    const cloned = Object.assign({}, trade);
    let { barrier, barrier2, barrierType } = trade;

    // clear all barrier
    delete cloned.barrier;
    delete cloned.barrier2;
    delete cloned.low_barrier;
    delete cloned.high_barrier;

    if (!barrier) {                                 //  if trade do not have barrier, default to last tick
        cloned.barrier = +lastTick;
        return cloned;
    }

    switch (barrierType) {
        case 'absolute': {
            if (barrier && barrier2) {
                cloned.low_barrier = +barrier2;
                cloned.high_barrier = +barrier;
            } else if (!barrier2) {
                cloned.barrier = +barrier;
            }
            return cloned;
        }
        case 'digit': {
            return {
                ...cloned,
                barrier: +barrier,
            };
        }
        case 'relative':
        default: {
            const absoluteBarrier1 = +(barrier) + lastTick;
            const absoluteBarrier2 = +(barrier2) + lastTick;

            if (barrier && barrier2) {
                cloned.low_barrier = absoluteBarrier2;
                cloned.high_barrier = absoluteBarrier1;
            } else if (!barrier2) {
                cloned.barrier = absoluteBarrier1;
            }
            return cloned;
        }
    }
};
