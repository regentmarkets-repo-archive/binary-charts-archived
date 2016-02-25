import { expect } from 'chai';
import * as dz from '../DataZoom';

describe('DataZoom', () => {
    "use strict";
    it('should create working dataZoom by default', () => {
        const defaultDZ = dz.createDefaultDataZoom();
        expect(defaultDZ).to.have.length(2);
        expect(defaultDZ).to.have.deep.property('0.type', 'inside');
        expect(defaultDZ).to.have.deep.property('1.type', 'slider');
    });
});
