import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import BinaryChart from '../BinaryChart';

describe('BinaryChart', () => {
    it('can be rendered without parameters', () => {
        expect(<BinaryChart />).to.not.throw;
    });

    it('renders a div', () => {
        const wrapper = shallow(<BinaryChart />);
        expect(wrapper.type()).to.equal('div');
    });

    // it('shouldComponentUpdate a div', () => {
    //     const wrapper = shallow(<BinaryChart />);
    //     const spy = sinon.spy(wrapper.instance(), 'shouldUpdateChart');
    //     const mock = sinon.mock(wrapper.instance());
    //     wrapper.instance().shouldComponentUpdate({ ticks: [] });
    //     // mock.shouldComponentUpdate({});
    //     expect(spy).to.have.called('shouldUpdateChart');
    // });
});
