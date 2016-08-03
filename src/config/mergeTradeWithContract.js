// TODO: improve this into an adapter that transform messy server data into cleaner data for internal use
export default ({ trade, contract, lastTick }) => {
    if (contract) {
        const cloned = Object.assign({ }, contract);
        const { barrier_count, barrier, low_barrier, high_barrier } = contract;

        switch (barrier_count) {
            case 1: {
                if (barrier) {
                    cloned.barrier = +barrier;
                } else {
                    cloned.barrier = +lastTick;
                }
                return cloned;
            }
            case 2: {
                if (low_barrier && high_barrier) {
                    cloned.low_barrier = +low_barrier;
                    cloned.high_barrier = +high_barrier;
                    return cloned;
                }
                break;
            }
            case undefined: {
                return cloned;
            }
            default: throw new Error('Unexpected barrier_count from contract: ', contract);
        }
    }

    if (!trade) {
        return undefined;
    }

    const cloned = Object.assign({ entry_tick: +lastTick }, trade);
    let { barrier, barrier2, barrierType } = trade;

    // clear all barrier
    delete cloned.barrier;
    delete cloned.barrier2;
    delete cloned.low_barrier;
    delete cloned.high_barrier;
    delete cloned.barrierType;

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
