import { getImage } from '../../../Config/images.js';

const SearchBarStyle = (theme) => ({
    root: {
        width: '95%',
        height: 'auto',
        margin: '0 auto',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    postWrapper: {
        display: 'grid',
        gridGap: '24px',
        gridTemplateColumns: 'repeat(3,1fr)',
    },
    result: {
        padding: '16px 0',
    },
    background: {
        backgroundImage: `url('${getImage('general', 'background', 'main')}')`,
        height: 600,
        width: 'calc(100% + 24px)',
        backgroundSize: '100%',
        backgroundPosition: 'bottom',
        position: 'relative',
        bottom: 10,
        right: 12,
    },
    searchTitle: {
        color: 'white',
        letterSpacing: '1px',
    },
    searchInput: {
        width: 300,
        display: 'flex',
        margin: '0px auto',
        borderRadius: 30,
        backgroundColor: theme.palette.lightOrange.main,
        padding: '5px 15px',
    },
    inputWrapper: {
        paddingTop: '10%',
    },
});

export default SearchBarStyle;
