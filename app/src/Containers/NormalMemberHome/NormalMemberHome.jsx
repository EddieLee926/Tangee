import React, { useState, useEffect } from 'react';
import Tagchip from '../../Components/NormalMemberHome/Tags/Tagchip.jsx';
import Personal from '../../Components/NormalMemberHome/Personal/Personal.jsx';
import ShowTag from '../../Components/General/Tag/ShowTag.js';
import UpdateTag from '../../Components/General/Tag/UpdateTag.js';
import NotifyStockData from '../../Components/General/NotifyStockData/NotifyStockData.js';

import { userSelector } from '../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
const NormalMemberHome = () => {
    const { userid } = useSelector(userSelector);

    return (
        <React.Fragment>
            <NotifyStockData />
            <Personal />
            {/* <Tagchip /> */}
            {/* <RegisterSecurityAccount /> */}
            {/* <ShowTag key={"showTag" + userid} id={userid} />
            <UpdateTag key={"updateTag" + userid} id={userid} /> */}
        </React.Fragment>
    )
};
//     const { userid } = useSelector(userSelector);

//     const [users, setUsers] = useState()
//     useEffect(() => {
//         getDataLogic(userid).then(result => {
//             console.log(result.data)
//             setUsers(result.data)
//         })
//     }, []);


//     const UsersDiv = ({ users }) => {
//         if (users) {
//             return (
//                 <div >
//                     <React.Fragment>
//                         <div>
//                             <LoadImage />
//                             {/* <UploadImage />
//                 <DeleteImage /> */}
//                         </div>



//                     </React.Fragment>
//                     {
//                         users.map(user => {
//                             return <div key={user}>
//                                 <p>暱稱:{user.nick_name}</p>
//                                 <p>email:{user.email}</p>
//                                 <p>電話:{user.phone}</p>

//                             </div>
//                         })
//                     }
//                 </div>
//             )
//         }
//         return <div><TableCell align="right"><Skeleton animation="wave" /></TableCell></div>
//     }
//     const UsersDiv2 = ({ users }) => {
//         if (users) {
//             return (
//                 <div>
//                     {
//                         users.map(user => {
//                             return <div key={user} class="center">

//                                 <h3>會員等級:{user.member_level}</h3>
//                                 <h3>投資金額:{user.invest_amount}</h3>
//                                 <h3>投資目標:{user.invest_goal}</h3>
//                                 <h3> 風險偏好:{user.risk}</h3>
//                             </div>
//                         })
//                     }
//                 </div>
//             )
//         }
//         return <div><TableCell align="right"><Skeleton animation="wave" /></TableCell>
//         </div>
//     }
//     return (<>
//         <Personal />
//         <h3>個人頁面</h3>

//         <div style={{
//             backgroundColor: 'whitesmoke',
//             width: '200px',
//             height: '350px',
//             float: 'left'
//         }}>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <UsersDiv users={users} />

//             </div>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

//                 <Button variant="contained" color="inherant" component={Link} to='/subscribed-star-investor'>修改個人資料</Button>
//             </div>
//         </div>
//         <div style={{
//             backgroundColor: 'white',
//             width: '40px',
//             height: '300px',
//             float: 'left'
//         }}> </div>

//         <div style={{
//             backgroundColor: 'whitesmoke',
//             width: '280px',
//             height: '350px',
//             float: 'left'
//         }}>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <UsersDiv2 users={users} />
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <br></br>  <br></br>  <br></br>  <br></br><br></br><br></br>
//                 <Button variant="contained" color="inherant" component={Link} to='/subscribed-star-investor'>我的明星投資者</Button>
//                 <Button variant="contained" color="inherant" component={Link} to='/subscribed-post'>我的訂閱文章</Button>
//             </div>

//         </div>


//     </>);



// };


export default NormalMemberHome;