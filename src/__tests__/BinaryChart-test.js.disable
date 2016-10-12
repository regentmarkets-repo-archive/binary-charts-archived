import React from 'react';
import { shallow } from 'enzyme';
import BinaryChart from '../BinaryChart';

describe('BinaryChart', () => {
    it('can be rendered without parameters', () => {
        expect(<BinaryChart />).not.toThrow();
    });

    it('renders a div', () => {
        const wrapper = shallow(<BinaryChart />);
        expect(wrapper.type()).toEqual('div');
    });
});
