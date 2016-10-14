## Binary chart usage


### Use with React

```
import { BinaryChart } from 'binary-charts';

export class MyComponentWithChart extends React.Component {

    render() {
        const { ticks, contract } = this.props

        return (
            <BinaryChart
                ticks={ticks}
                contract={contract}
            />
        )
    }
}

```


For complete list of props, check [API.MD](./API.MD)