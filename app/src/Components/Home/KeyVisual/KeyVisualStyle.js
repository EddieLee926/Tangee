import { getImage } from '../../../Config/images.js';

const KeyVisualStyle = () => ({
    root: {
        backgroundImage: `url('${getImage('general', 'background', 'main')}')`,
        height: 600,
        width: 'calc(100% + 24px)',
        backgroundSize: '100%',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        bottom: 10,
        right: 12,
    },
    text: {
        color: 'white',
        letterSpacing: 1,
    },
    image: {
        width: 120,
        display: 'block',
        padding: '40px 0',
        margin: 'auto',
    },
});

export default KeyVisualStyle;
