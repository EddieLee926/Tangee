import React, { useState, useEffect } from 'react';
import { convertToHTML } from 'draft-convert';
import { convertFromRaw } from 'draft-js';
import getApi from '../../../Utils/Api/getApi';
import DOMPurify from 'dompurify';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
const sanitizer = DOMPurify.sanitize;

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

const StockDetailContent = ({ starID, stock }) => {
    const [content, setContent] = useState(`{"blocks":[{"key":"b4945","text":"載入中","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`)
    const { broScheme } = useSelector(userSelector);
    var data = {
        starID: starID,
        stock: stock,
        broScheme: broScheme
    }
    useEffect(() => {
        const getArticleContent = async () => {

            const response = await getApi.post('/article/get-stock-detail', data)
            console.log(response.data)
            setContent(response.data.note)
        }
        getArticleContent()
    }, []);

    const inner_html = sanitizer(convertContent(content))

    return (
        <div dangerouslySetInnerHTML={{ __html: inner_html }}></div>
    )
}

export default StockDetailContent;