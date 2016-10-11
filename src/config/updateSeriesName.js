import getMainSeries from '../utils/getMainSeries';

export default (chart, newName) => getMainSeries(chart).update({ name: newName }, false);
