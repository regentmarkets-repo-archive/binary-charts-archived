import React, { PureComponent } from 'react';

type Props = {
};

export default class SharePicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    render() {
        return (
            <select>
                <option>Share</option>
                <option>PDF</option>
                <option>Download Image</option>
            </select>
        );
    }
}
