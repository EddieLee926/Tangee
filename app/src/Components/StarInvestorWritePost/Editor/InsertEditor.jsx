import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import MUIRichTextEditor from 'mui-rte';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import getApi from '../../../Utils/Api/getApi';
import styles from './InsertEditorStyle';
import { Typography } from '@material-ui/core';
import { GeneralButton, LinkButton } from '../../General/CustomButton/CustomButton';
// import { convertToHTML } from 'draft-convert';
// import { convertFromRaw } from 'draft-js';
// import DOMPurify from 'dompurify';
// import FormControl from '@material-ui/core/FormControl';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';

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

const InsertEditor = () => {
    const classes = useStyles();
    const { userid } = useSelector(userSelector);
    const [content, setContent] = useState(
        `{"blocks":[{"key":"b4945","text":"載入中","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`
    );
    const defaultValue = `{"blocks":[{"key":"b4945","text":"載入中!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;
    const [title, setTitle] = useState();
    const [chipData, setChipData] = useState();
    const [selectedchip, setselectedChip] = useState([]);
    const [selectedInputSection, setSelectedInputSection] = useState();

    useEffect(() => {
        const getSelectItem = async () => {
            const response = await getApi.post('/tag');
            // console.log(response, "uuu")
            setChipData(response.data);
            // console.log(setChipData(response.data), "哈哈")
        };
        getSelectItem();
    }, []);

    const handleDelete = (chipToSelect) => () => {
        var newselectedChip = selectedchip.filter(function (item, index, array) {
            return item.value != chipToSelect.value;
        });
        setselectedChip(newselectedChip);
        var tagg = chipData;
        tagg.push(chipToSelect);
        setChipData(tagg);
    };

    const handleAddChip = (chipToSelect) => () => {
        var tagg = selectedchip;
        if (tagg.length < 3) {
            tagg.push(chipToSelect);
            setselectedChip(tagg);
            var newChip = chipData.filter(function (item, index, array) {
                return item.value != chipToSelect.value;
            });
            setChipData(newChip);
        } else {
            alert('標籤最多只能選三個呦~不好意思!');
        }
    };
    const ref = useRef();
    const inputRef = useRef();
    const handleClick = () => {
        ref.current.save();
    };
    const handleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleSave = async (content) => {
        // console.log('要送出的喔喔喔', selectedchip);
        var tagString = '';
        selectedchip.forEach((element) => {
            tagString += ',' + element.value;
        });
        // console.log(tagString);
        const data = {
            content: JSON.stringify(JSON.parse(content)),
            title: inputRef.current.value,
            user_id: userid,
            tagString: tagString + ',',
        };
        // console.log(data, '新增');
        const response = await getApi.post('/article/insert-article', data);
        alert('文章已新增');
    };

    const handleSelectedInput = (value) => {
        setSelectedInputSection(value);
    };

    return (
        <>
            <div
                className={classes.fakeBackground}
                onClick={() => handleSelectedInput(4)}
            />
            <MuiThemeProvider theme={defaultTheme}>
                <div className={classes.root}>
                    <div
                        className={clsx({
                            [classes.inputSection]: true,
                            [classes.selectedInputSection]: selectedInputSection === 0,
                        })}
                    >
                        <Typography variant='body1'>標題</Typography>
                        <TextField
                            id='title'
                            value={title}
                            onchange={handleChange}
                            inputRef={inputRef}
                            variant='outlined'
                            onFocus={() => handleSelectedInput(0)}
                            fullWidth
                            onF
                        />
                    </div>
                    <div
                        onClick={() => handleSelectedInput(1)}
                        className={clsx({
                            [classes.inputSection]: true,
                            [classes.selectedInputSection]: selectedInputSection === 1,
                        })}
                    >
                        <Typography variant='body1'>內文</Typography>
                        <MUIRichTextEditor
                            label='type something...'
                            inlineToolbar={true}
                            controls={controls}
                            onSave={handleSave}
                            customControls={customControls}
                            ref={ref}
                            defaultValue={content ? content : defaultValue}
                        />
                    </div>
                    <div
                        onClick={() => handleSelectedInput(2)}
                        className={clsx({
                            [classes.inputSection]: true,
                            [classes.selectedInputSection]: selectedInputSection === 2,
                        })}
                    >
                        <Typography variant='body1'>請選擇您文章的標籤</Typography>
                        {chipData ? (
                            chipData.map((data) => (
                                <Chip
                                    id={`${data.value}`}
                                    label={data.explanation}
                                    onClick={handleAddChip(data)}
                                    className={classes.chip}
                                    value={data.value}
                                />
                            ))
                        ) : (
                            <Skeleton animation='wave' />
                        )}
                        <div>
                            <Typography variant='body1'>您選擇的標籤</Typography>
                            {selectedchip ? (
                                selectedchip.map((data) => (
                                    <Chip
                                        id={`${data.value}`}
                                        label={data.explanation}
                                        className={classes.chipSelected}
                                        onDelete={handleDelete(data)}
                                    />
                                ))
                            ) : (
                                <Skeleton animation='wave' />
                            )}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
            <LinkButton
                className={classes.button}
                onClick={handleClick}
                category='normal'
                to='/star/post'
            >
                儲存
            </LinkButton >
        </>
    );
};

export default InsertEditor;
