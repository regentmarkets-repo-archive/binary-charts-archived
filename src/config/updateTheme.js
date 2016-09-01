// $FlowFixMe
import Highcharts from '../highcharts/highstock';
import { lightTheme, darkTheme } from '../themes';

export default (theme: Theme) => {
    if (theme === 'dark') {
        Highcharts.setOptions(darkTheme);
    } else {
        Highcharts.setOptions(lightTheme);
    }
};
