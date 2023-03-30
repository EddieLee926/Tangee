const file = require("../Asset/TWSE_DATA.json");



exports.get_stock_detail = (req, res) => {
    //console.log(req.body);

    const { key1 } = req.body;
    //const object;
    //console.log(file[key1]);
    res.json(file[key1].endPrice);

}

