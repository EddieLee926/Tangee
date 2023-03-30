import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { convertToHTML } from 'draft-convert';
import { convertFromRaw } from 'draft-js';
import getApi from '../../../Utils/Api/getApi';
import DOMPurify from 'dompurify';
import Typography from '@material-ui/core/Typography';
import { LinkButton } from '../../General/CustomButton/CustomButton';
import CancelSubscribeSingleArticleButton from '../../StarInvestorDetails/Button/CancelSubscribeSingleArticleButton';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import styles from './PostContentStyle';
const sanitizer = DOMPurify.sanitize;

const useStyles = makeStyles(styles);

const convertSetting = {
    styleToHTML: (inlineStyleRanges) => {
        let inlineStyle = {};
        if (inlineStyleRanges === 'STRIKETHROUGH') {
            inlineStyle['textDecoration'] = 'line-through';
        }
        if (inlineStyleRanges === 'HIGHLIGHT') {
            inlineStyle['backgroundColor'] = 'yellow';
        }
        if (inlineStyleRanges === 'UNDERLINE') {
            inlineStyle['textDecoration'] = 'underline';
        }
        if (inlineStyleRanges === 'ITALIC') {
            inlineStyle['fontStyle'] = 'italic';
        }
        return <span style={inlineStyle} />;
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
            let imageWraperStyle = { width: '100%' };
            if (entity.data.width) {
                imageStyle['width'] = entity.data.width;
            }
            if (entity.data.height) {
                imageStyle['height'] = entity.data.height;
            }
            if (entity.data.alignment) {
                imageWraperStyle['textAlign'] = entity.data.alignment;
            }
            return (
                <div style={imageWraperStyle}>
                    <img src={entity.data.url} style={imageStyle} />
                </div>
            );
        }
        return originalText;
    },
};

const convertContent = (content) => {
    content = JSON.parse(content);
    const transformed = convertFromRaw(content);
    const html = convertToHTML(convertSetting)(transformed);
    return html;
};

const PostContent = (props) => {
    const { postId } = props;
    const { userid } = useSelector(userSelector);
    const [content, setContent] = useState(
        `{"blocks":[{"key":"b4945","text":"載入中","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`
    );
    const [users, setUsers] = useState();
    const [subscribed, setSubscribed] = useState();
    const classes = useStyles();
    useEffect(() => {
        const getArticleContent = async () => {
            const response = await getApi.post('/article/get-edit-article', {
                postId: postId,
            });
            setContent(response.data[0].content);
            setUsers(response.data[0]);
        };
        getArticleContent();
        const getArticleState = async () => {
            const data = {
                userid: userid,
                postId: postId,
            };
            const response = await getApi.post('/article/get-sbs-state', data);
            setSubscribed(response.data);
            console.log(response.data);
        };
        getArticleState();
    }, []);

    const inner_html = sanitizer(convertContent(content));
    const UsersDiv = ({ users }) => {
        if (users) {
            return (
                <div key={users}>
                    <Typography variant='h1' align='left'>
                        {users.title}
                    </Typography>
                </div>
            );
        }
        return <div></div>;
    };
    const BuyButton = ({ subscribed }) => {
        if (subscribed) {
            return (
                <div className={classes.button}>
                    {subscribed['fullArticle'] === 'True' ? (
                        <CancelSubscribeSingleArticleButton
                            postId={postId}
                            userid={userid}
                        ></CancelSubscribeSingleArticleButton>
                    ) : subscribed['singleArticle'] === 'True' ? (
                        <CancelSubscribeSingleArticleButton
                            postId={postId}
                            userid={userid}
                        ></CancelSubscribeSingleArticleButton>
                    ) : (
                        <LinkButton category='normal' to={`/singlepostpayment/${postId}`}>
                            購買文章
                        </LinkButton>
                    )}
                </div>
            );
        }
        return <div></div>;
    };

    const Content = ({ subscribed }) => {
        if (subscribed) {
            return (
                <div className={classes.button}>
                    {subscribed['fullArticle'] === 'True' ? (
                        <div dangerouslySetInnerHTML={{ __html: inner_html }}></div>
                    ) : subscribed['singleArticle'] === 'True' ? (
                        <div dangerouslySetInnerHTML={{ __html: inner_html }}></div>
                    ) : (
                        <div className={classes.hide}>
                            <div className={classes.blur}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Ipsum nam quos, corporis aliquid, quia, ipsa vero
                                praesentium placeat ea dolorum iste corrupti facere
                                adipisci in tempora alias. Eligendi, dolores natus!
                                <br /> Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Ipsum nam quos, corporis aliquid, quia, ipsa vero
                                praesentium placeat ea <br />
                                dolorum iste corrupti facere adipisci in tempora alias.
                                Eligendi, dolores natus! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Ipsum nam quos, corporis
                                aliquid, quia, ipsa vero praesentium placeat ea dolorum
                                iste corrupti facere adipisci in tempora alias. Eligendi,
                                dolores natus!
                            </div>
                            <Typography
                                align='center'
                                variant='h2'
                                className={classes.text}
                            >
                                購買或訂閱吃到飽觀看完整文章
                            </Typography>
                        </div>
                    )}
                </div>
            );
        }
        return <div></div>;
    };

    return (
        <div>
            <div className={classes.title}>
                <UsersDiv users={users} />
                <BuyButton subscribed={subscribed} />
            </div>
            <Divider />
            <Content subscribed={subscribed} />
        </div>
    );
};

export default PostContent;
