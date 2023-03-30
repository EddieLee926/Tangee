const path = require('path');

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    // 這邊小麻煩 改合約的話要compile 2次 沒辦法同時compile到2個folder
    // 或把compile後的合約複製到app的contracts

    ///先下以下指令
    //truffle migrate -f 3 --to 3 --network node2
    //truffle migrate -f 2 --to 2 --network institution
    //接者將contracts_build_directory改為註解的再重下剛剛兩條指令
    //contracts_build_directory: path.join(__dirname, 'app/src/contracts'),
    contracts_build_directory: path.join(__dirname, 'express/contracts'),
    networks: {
        // migrate with certain file

        develop: {
            // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
            host: '127.0.0.1',
            port: 8545,
            network_id: '1337',
        },
        development: {
            host: '127.0.0.1',
            port: 22000,
            network_id: '*',
            type: 'quorum',
            gas: 4500000,
            gasPrice: 0,
        },
        institution: {
            url: 'ws://140.119.19.14:23000',
            network_id: '*',
            type: 'quorum',
            gas: 4500000,
            gasPrice: 0,
        },
        node2: {
            url: 'ws://140.119.19.14:23001',
            network_id: '*',
            type: 'quorum',
            gas: 4500000,
            gasPrice: 0,
        },
        node3: {
            url: 'ws://140.119.19.14:23002',
            network_id: '*',
            type: 'quorum',
            gas: 4500000,
            gasPrice: 0,
        },
        node4: {
            url: 'ws://140.119.19.14:23003',
            network_id: '*',
            type: 'quorum',
            gas: 4500000,
            gasPrice: 0,
        },
        node5: {
            url: 'ws://140.119.19.14:23004',
            network_id: '*',
            type: 'quorum',
            gas: 4500000,
            gasPrice: 0,
        },
        node6: {
            url: 'ws://140.119.19.14:23005',
            network_id: '*',
            type: 'quorum',
            gas: 4500000,
            gasPrice: 0,
        },
        node7: {
            url: 'ws://140.119.19.14:23006',
            network_id: '*',
            type: 'quorum',
            gas: 4500000,
            gasPrice: 0,
        },
    },
    compilers: {
        solc: {
            version: '0.8.0',
        },
    },
};

//truffle migrate -f 3 --to 3 --network node2
//truffle migrate -f 2 --to 2 --network institution
