import React, { useState, useEffect } from 'react';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './InventoryCompositionStyle';
import getApi from '../../../Utils/Api/getApi';

const useStyles = makeStyles(styles);

const Row = ({ row }) => {
  return (
    <TableRow>
      <TableCell align="left" component="th" scope="row">
        {row.stock_name}
      </TableCell>
      <TableCell align="left">{row.explanation}</TableCell>
      <TableCell align="center">{row.endPrice} / {row.average_price}</TableCell>
      <TableCell align="center">{row.propertyValue}</TableCell>
      <TableCell align="center">{parseInt((row.endPrice - row.average_price) * row.propertyValue)}</TableCell>
    </TableRow>
  )
}

const InventoryComposition = ({ selectedStarInvestor, IfNormalPage }) => {
  const classes = useStyles();
  const [rows, setRows] = useState();
  const [isFetching, setIsFetching] = useState(true)
  const { broScheme } = useSelector(userSelector);
  const { userid, isStarInvestor } = useSelector(userSelector);

  useEffect(() => {
    const getInventoryComposition = async () => {
      var data;
      if (IfNormalPage) {
        data = {
          selectedStarInvestor: selectedStarInvestor,
          broScheme: broScheme,
          userid: userid
        }

      } else {
        data = {
          selectedStarInvestor: userid,
          broScheme: broScheme,
          userid: userid
        }

      }
      // if (isStarInvestor) {
      //   data = {
      //     selectedStarInvestor: userid,
      //     broScheme: broScheme
      //   }
      // } else {
      //   data = {
      //     selectedStarInvestor: selectedStarInvestor,
      //     broScheme: broScheme,
      //     userid: userid
      //   }
      // }

      console.log("data", data, isStarInvestor)
      const response = await getApi.post('/inventory-composition-table', data)
      // const row = response.data;
      // setRows(row)
      console.log("結1:", response.data.length);
      //response.data.length == 0 ? setRows('') : setRows(response.data)
      setRows(response.data)
      console.log("結果:", response.data);
      console.log("結果1:", rows);
      setIsFetching(false)
    }
    getInventoryComposition()

    return (() => {
      setIsFetching(true)
    })

  }, [selectedStarInvestor])

  // if (isFetching) {
  //   return <Skeleton variant="rect" width={120} height={56} />
  // }

  return (
    <div>
      {
        rows ?
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">名稱</TableCell>
                  <TableCell align="left">交易模式</TableCell>
                  <TableCell align="center">市/均</TableCell>
                  <TableCell align="center">股數</TableCell>
                  <TableCell align="center">損益</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map((row, index) => (
                    <Row key={index} row={row} />
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          :
          <div>尚無資料</div>
      }
    </div>
  );
}

export default InventoryComposition;