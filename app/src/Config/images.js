//general
import TANGEE_LOGO_1 from '../assets/images/Tangee_logo_1.png';
import TANGEE_LOGO_2 from '../assets/images/Tangee_logo_2.jpg';
import TANGEE_LOGO_3 from '../assets/images/Tangee_logo_3.png';
import TANGEE_MAIN_IMAGE from '../assets/images/Tangee_home_background.png';
import TANGEE_MAIN_CELLPHONE_BACKGROUND from '../assets/images/phone_background.png';
import TANGEE_MAIN_CELLPHONE_EMAIL_NOTICE from '../assets/images/email_notice.png';
import TANGEE_MAIN_KBAR from '../assets/images/Tangee_Kbar.JPG';
import TANGEE_MAIN_BLOCKCHAIN from '../assets/images/blockchain-technology.jpg';
import TANGEE_MAIN_BLOCKCHAIN_LOGO from '../assets/images/blockchain.png';
import TANGEE_MAIN_BLOCKCHAIN_MYSQL from '../assets/images/mysql.png';
import TANGEE_MAIN_BLOCKCHAIN_NODE from '../assets/images/node.jpeg';
import TANGEE_MAIN_BLOCKCHAIN_QUORUM from '../assets/images/quorum.png';
import TANGEE_MAIN_BLOCKCHAIN_REACT from '../assets/images/react.png';
import TANGEE_MAIN_BLOCKCHAIN_SOLIDITY from '../assets/images/solidity.png';
// star_home
import STAR_INVESTOR_BACKGROUND from '../assets/images/star_investor_background.jpg';
// POST PAGE
import POST_BACKGROUND from '../assets/images/post_background.svg';
// star_management
import ICON_USER from '../assets/images/icon_user.svg';
import ICON_ARROW_RISE from '../assets/images/icon_arrow_rise.svg';
import ICON_MOUSE from '../assets/images/icon_mouse.svg';
// register
import NORMAL_USER from '../assets/images/user.png';
import STAR_USER from '../assets/images/pro.png';

// page ex: star_home, normal_home, ...規則:頁面路徑名( /斜線 改 _底線 )
// type ex: background, avatar(人像圖), logo...
// value 名稱
const getImage = (page, type, value = null) => {
    if (page === 'general') {
        if (type === 'logo') {
            if (value === 'type1') {
                return TANGEE_LOGO_1;
            }
            if (value === 'type2') {
                return TANGEE_LOGO_2;
            }
            if (value === 'type3') {
                return TANGEE_LOGO_3;
            }
        }
        if (type === 'background') {
            if (value === 'main') {
                return TANGEE_MAIN_IMAGE;
            }
            if (value === 'cellphonemain') {
                return TANGEE_MAIN_CELLPHONE_BACKGROUND;
            }
            if (value == 'emailnotice') {
                return TANGEE_MAIN_CELLPHONE_EMAIL_NOTICE;
            }
            if (value === 'Kbar') {
                return TANGEE_MAIN_KBAR;
            }
            if (value === 'blockchain') {
                return TANGEE_MAIN_BLOCKCHAIN;
            }
            if (value === 'blockchainLogo') {
                return TANGEE_MAIN_BLOCKCHAIN_LOGO;
            }
        }
        if (type === 'blockchain') {
            if (value === 'mysql') {
                return TANGEE_MAIN_BLOCKCHAIN_MYSQL;
            }
            if (value === 'node') {
                return TANGEE_MAIN_BLOCKCHAIN_NODE;
            }
            if (value === 'quorum') {
                return TANGEE_MAIN_BLOCKCHAIN_QUORUM;
            }
            if (value === 'react') {
                return TANGEE_MAIN_BLOCKCHAIN_REACT;
            }
            if (value === 'solidity') {
                return TANGEE_MAIN_BLOCKCHAIN_SOLIDITY;
            }
        }
    }
    if (page === 'star_home') {
        if (type === 'background') {
            if (value === 'happen_background') {
                return STAR_INVESTOR_BACKGROUND;
            }
            if (value === 'happen_background2') {
                return POST_BACKGROUND;
            }
        }
    }
    if (page === 'star_management') {
        if (type === 'icon') {
            if (value === 'user') {
                return ICON_USER;
            }
            if (value === 'arrow_rise') {
                return ICON_ARROW_RISE;
            }
            if (value === 'mouse') {
                return ICON_MOUSE;
            }
        }
    }
    if (page === 'register') {
        if (type === 'logo') {
            if (value === 'normal_user') {
                return NORMAL_USER;
            }
            if (value === 'star_user') {
                return STAR_USER;
            }
        }
    }
    return null;
};

export { getImage };
