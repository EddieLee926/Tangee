import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Skeleton from '@material-ui/lab/Skeleton';
import getApi from '../../../Utils/Api/getApi';
import styles from './ReceiptListStyle';

const useStyles = makeStyles(styles);

const Row = props => {
  const { row } = props;
  const { isStarPage } = props;
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(row.remarks);
  const rowRef = useRef();
  const inputProps = { readOnly: !isStarPage }
  const defaultValue = row.remarks ? row.remarks : "尚無備註";

  const classes = useStyles();

  const handleChange = event => {
    setContent(event.target.value)
  }

  const handleSubmitContent = async () => {
    const detail_num = Number(rowRef.current.name)
    const data = { detail_num: detail_num, remarks: content }
    console.log(data)
    const response = await getApi.post(
      'getData/update-inventory-receiptlist-remark', data)
    alert(response.data);

  }

  const saveButtonClasses = classNames({
    [classes.notDisplay]: !isStarPage
  })

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.updateTime}
        </TableCell>
        <TableCell align="right">{row.stock_name}</TableCell>
        <TableCell align="right">{row.explanation}</TableCell>
        <TableCell align="right">{row.trade_price}/{row.propertyValue}</TableCell>
        <TableCell align="right">{Number(row.propertyValue) * row.trade_price}</TableCell>
        <TableCell align="right">
          {
            isStarPage ?
              <Button variant="contained" color="primary" disableElevation onClick={() => setOpen(!open)}>
                編輯
              </Button>
              :
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                備註
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                fullWidth
                variant="outlined"
                onChange={handleChange}
                InputProps={inputProps}
                defaultValue={defaultValue}
                name={row.detail_num.toString()}
                inputRef={rowRef}

              />
              <Button variant="contained"
                color="primary"
                disableElevation
                onClick={handleSubmitContent}
                className={saveButtonClasses}
              >
                儲存
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ReceiptList = ({ selectedStarInvestor, selectedStock, isStarPage }) => {
  const { userid, broScheme } = useSelector(userSelector);
  const [rows, setRows] = useState();
  console.log("susssh", selectedStarInvestor, selectedStock)
  useEffect(() => {
    const getInventoryReceipt = async () => {
      const data = {
        selectedStarInvestor: selectedStarInvestor,
        selectedStock: selectedStock,
        broScheme: broScheme,
      }
      console.log("suh", data)
      const response = await getApi.post('/inventory-receipt-table', data)
      const row = response.data;
      console.log("suh", row)
      setRows(row)
    }
    getInventoryReceipt()
  }, [selectedStarInvestor, selectedStock])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>日期</TableCell>
            <TableCell align="right">名稱</TableCell>
            <TableCell align="right">交易模式</TableCell>
            <TableCell align="right">價格/股數</TableCell>
            <TableCell align="right">應受付/損益</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows ?
              rows.map((row) => (
                <Row key={row.detail_num} row={row} isStarPage={isStarPage} />
              ))
              :
              <TableRow>
                <TableCell><Skeleton animation="wave" /></TableCell>
                <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                <TableCell align="right"><Skeleton animation="wave" /></TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReceiptList;