import React, { useRef, useState, useEffect } from 'react';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import MUIRichTextEditor from 'mui-rte';
import getApi from '../../../Utils/Api/getApi';
import { convertToHTML } from 'draft-convert';
import { convertFromRaw } from 'draft-js';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { useSelector } from 'react-redux';
const defaultTheme = createTheme()



Object.assign(defaultTheme, {
        overrides: {
                MUIRichTextEditor: {
                        root: {
                                margin: "20px auto 0",
                                width: "820px",
                                border: "1.5px solid #c7c7c7",
                                borderRadius: "5px",
                                overflow: 'hidden'
                        },
                        container: {
                                margin: 0
                        },
                        toolbar: {
                                borderBottom: "1.5px solid #c7c7c7",
                                backgroundColor: '#f2f2f2'
                        },
                        editor: {
                                overflowY: "auto",
                                height: "250px",
                                padding: "0 10px",
                        }
                }
        }
})

const controls = ["h1-block", "h2-block", "h3-block", "h4-block", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear"]
const customControls = [
        {
                name: "h1-block",
                type: "block",
                icon: <LooksOneIcon />,
                style: 'header-one',
                blockWrapper: <h1 />
        },
        {
                name: "h2-block",
                type: "block",
                icon: <LooksTwoIcon />,
                style: 'header-two',
                blockWrapper: <h2 />
        },
        {
                name: "h3-block",
                type: "block",
                icon: <Looks3Icon />,
                style: 'header-three',
                blockWrapper: <h3 />
        },
]
const convertSetting = {
        styleToHTML: (inlineStyleRanges) => {
                let inlineStyle = {};
                if (inlineStyleRanges === "STRIKETHROUGH") {
                        inlineStyle['textDecoration'] = 'line-through'
                }
                if (inlineStyleRanges === "HIGHLIGHT") {
                        inlineStyle['backgroundColor'] = 'yellow'
                }
                if (inlineStyleRanges === "UNDERLINE") {
                        inlineStyle['textDecoration'] = 'underline'
                }
                if (inlineStyleRanges === "ITALIC") {
                        inlineStyle['fontStyle'] = 'italic'
                }
                return <span style={inlineStyle} />
        },
        blockToHTML: (block) => {
                if (block.type === 'H1-BLOCK') {
                        return <h1 />;
                }
                if (block.type === 'H2-BLOCK') {
                        return <h2 />;
                }
                if (block.type === 'H3-BLOCK') {
                        return <h3 />;
                }
                if (block.type == 'code-block') {
                        return <code />;
                }
        },
        entityToHTML: (entity, originalText) => {
                if (entity.type === 'LINK') {
                        return <a href={entity.data.url}>{originalText}</a>;
                }
                if (entity.type === 'IMAGE') {
                        let imageStyle = {};
                        let imageWraperStyle = { "width": "100%" };
                        if (entity.data.width) {
                                imageStyle["width"] = entity.data.width
                        }
                        if (entity.data.height) {
                                imageStyle["height"] = entity.data.height
                        }
                        if (entity.data.alignment) {
                                imageWraperStyle["textAlign"] = entity.data.alignment
                        }
                        return (
                                <div style={imageWraperStyle}>
                                        <img src={entity.data.url} style={imageStyle} />
                                </div>
                        );
                }
                return originalText;
        }
}

const convertContent = (content) => {
        content = JSON.parse(content)
        const transformed = convertFromRaw(content)
        const html = convertToHTML(convertSetting)(transformed)
        return html
}

const ReceiptSummary = props => {
        const { userid } = useSelector(userSelector);
        console.log(userid, "作者Id喔喔喔")
        const { detail_num } = 1
        const [content, setContent] = useState(`{"blocks":[{"key":"b4945","text":"載入中","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`)
        const defaultValue = `{"blocks":[{"key":"b4945","text":"載入中!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`
        const ref = useRef()
        useEffect(() => {
                const getArticleContent = async () => {
                        const response = await getApi.post('/article/get-remark', { detail_num: 1 })
                        console.log(response.data[0].remarks, "lll")
                        setContent(response.data[0].remarks)
                }
                getArticleContent()
        }, []);
        const handleClick = () => {
                ref.current.save()
        }
        const handleSave = async (content) => {
                const data = { content: JSON.stringify(JSON.parse(content)), detail_num: 1, user_id: userid }
                const response = await getApi.post("/article/update-remark", data)
                alert("備註已更新")
        }
        return (
                <MuiThemeProvider theme={defaultTheme}>
                        <MUIRichTextEditor
                                label="type something..."
                                inlineToolbar={true}
                                controls={controls}
                                onSave={handleSave}
                                customControls={customControls}
                                ref={ref}
                                defaultValue={content ? content : defaultValue}
                        />
                        <div style={{ width: "50%", textAlign: "center", margin: "10px auto" }}>
                                <Button onClick={handleClick} color="primary" variant="contained" disableElevation >Save</Button>
                        </div>
                </MuiThemeProvider>

        )
}

export default ReceiptSummary;