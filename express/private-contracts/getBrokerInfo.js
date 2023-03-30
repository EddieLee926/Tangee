const { QUORUM, TESSERA_PUBLIC_KEY } = require('../config/quorum_settings');

module.exports = function getBrokerInfo(brokerId) {
    switch (brokerId) {
        case 'A':
            return {
                brokerId_addr: QUORUM.BROKER_A_ADDR,
                web_socket_conn: QUORUM.BROKER_A_WS,
                tessera_public_key: TESSERA_PUBLIC_KEY.BROKER_A_KEY,
            };
        case 'B':
            return {
                brokerId_addr: QUORUM.BROKER_B_ADDR,
                web_socket_conn: QUORUM.BROKER_B_WS,
                tessera_public_key: TESSERA_PUBLIC_KEY.BROKER_B_KEY,
            };
        case 'C':
            return {
                brokerId_addr: QUORUM.BROKER_C_ADDR,
                web_socket_conn: QUORUM.BROKER_C_WS,
                tessera_public_key: TESSERA_PUBLIC_KEY.BROKER_C_KEY,
            };
        case 'INSTITUTION':
            return {
                institution_addr: QUORUM.INSTITUTION_ADDR,
                web_socket_conn: QUORUM.INSTITUTION_WS,
            };
        default:
            return null;
    }
};
