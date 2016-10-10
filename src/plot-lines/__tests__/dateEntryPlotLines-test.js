import dateEntryPlotLines from '../dateEntryPlotLines';

describe('dateEntryPlotLines', () => {
    it('when contract is undefined no plot lines are returned', () => {
        const plotLines = dateEntryPlotLines();
        expect(plotLines.length).toEqual(0);
    });

    it('when no dates are provided, no plot lines are returned', () => {
        const plotLines = dateEntryPlotLines({});
        expect(plotLines.length).toEqual(0);
    });

    it.skip('when Purchase Time and Start Time are equal, only Start Time is rendered', () => {
        const plotLines = dateEntryPlotLines({
            date_start: 123,
            purchase_time: 123,
        });
        expect(plotLines.length).toEqual(1);
    });

    it.skip('when Purchase Time and Start Time are different, both are rendered', () => {
        const plotLines = dateEntryPlotLines({
            date_start: 123,
            purchase_time: 5,
        });
        expect(plotLines.length).toEqual(2);
    });

    it('when a single date is provided, one plot line is returned', () => {
        const plotLines = dateEntryPlotLines({ entry_tick_time: 123 });
        expect(plotLines.length).toEqual(1);
    });
});
