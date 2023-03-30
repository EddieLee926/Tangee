import React, { useRef, useState, useEffect } from 'react';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import MUIRichTextEditor from 'mui-rte';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { useSelector } from 'react-redux';
import { LinkButton, GeneralButton } from '../../General/CustomButton/CustomButton.jsx';
import { makeStyles } from '@material-ui/core/styles';
import getApi from '../../../Utils/Api/getApi';
import styles from './EditorStyle';
// import { convertToHTML } from 'draft-convert';
// import { convertFromRaw } from 'draft-js';
// import DOMPurify from 'dompurify';
const defaultTheme = createTheme();

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                width: '100%',
                border: '1.5px solid #c7c7c7',
                borderRadius: '5px',
                overflow: 'hidden',
            },
            container: {
                margin: 0,
            },
            toolbar: {
                borderBottom: '1.5px solid #c7c7c7',
                backgroundColor: '#f2f2f2',
                textAlign: 'center',
            },
            editor: {
                overflowY: 'auto',
                height: '250px',
                padding: '0 10px',
            },
        },
    },
});

const controls = [
    'h1-block',
    'h2-block',
    'h3-block',
    'h4-block',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'highlight',
    'undo',
    'redo',
    'link',
    'media',
    'numberList',
    'bulletList',
    'quote',
    'code',
    'clear',
];
const customControls = [
    {
        name: 'h1-block',
        type: 'block',
        icon: <LooksOneIcon />,
        style: 'header-one',
        blockWrapper: <h1 />,
    },
    {
        name: 'h2-block',
        type: 'block',
        icon: <LooksTwoIcon />,
        style: 'header-two',
        blockWrapper: <h2 />,
    },
    {
        name: 'h3-block',
        type: 'block',
        icon: <Looks3Icon />,
        style: 'header-three',
        blockWrapper: <h3 />,
    },
];

const useStyles = makeStyles(styles);
const Editor = (props) => {
    const classes = useStyles();
    const { userid } = useSelector(userSelector);
    const { postId } = props;
    const [content, setContent] = useState(
        `{"blocks":[{"key":"b4945","text":"載入中","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`
    );
    const defaultValue = `{"blocks":[{"key":"b4945","text":"載入中!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;
    useEffect(() => {
        const getArticleContent = async () => {
            const response = await getApi.post('/article/get-edit-article', {
                postId: postId,
            });
            setContent(response.data[0].content);
            console.log(response.data[0].content, 'edit-page');
        };
        getArticleContent();
    }, []);

    const ref = useRef();
    const handleClick = () => {
        ref.current.save();
    };
    const handleSave = async (content) => {
        const data = {
            content: JSON.stringify(JSON.parse(content)),
            post_id: postId,
            user_id: userid,
        };
        const response = await getApi.post('/article/update-article', data);
        alert('文章已更新');
    };
    return (
        <>
            <MuiThemeProvider theme={defaultTheme}>
                <MUIRichTextEditor
                    label='type something...'
                    inlineToolbar={true}
                    controls={controls}
                    onSave={handleSave}
                    customControls={customControls}
                    ref={ref}
                    defaultValue={content ? content : defaultValue}
                />
            </MuiThemeProvider>
            <GeneralButton
                className={classes.button}
                onClick={handleClick}
                category='normal'
            >
                儲存
            </GeneralButton>
        </>
    );
};

export default Editor;
