import { getImage } from '../../../Config/images.js';
const KChartBlockStyle = () => ({
    root: {
        backgroundImage: `url('${getImage('general', 'background', 'Kbar')}')`,
        width: 'calc(100% + 24px)',
        height: 400,
        backgroundSize: '100%',
        backgroundColor: 'yellow',
        position: 'relative',
        bottom: 10,
        right: 12,
    },
});

export default KChartBlockStyle;
