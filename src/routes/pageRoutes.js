import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminIds } from '../pages/authpage/adminIds';

import HomePage from '../pages/homepage/HomePage';
import AdminPage from '../pages/adminpage/AdminPage';
import AuthPage from '../pages/authpage/AuthPage';
import BookDetailPage from '../pages/bookdetailpage/BookDetailPage';

const Routes = (props) => {
    const currentUser = useSelector(state => state.users.currentUser)
    
    return (
        <Switch>
            <Route exact path='/admin' children={ currentUser && currentUser.isAdmin && adminIds.includes(currentUser.localId) ?  <AdminPage/> : () => <h3>You must be admin to view this page</h3>} />
            <Route exact path='/' children={<HomePage/>} />
            <Route path='/auth' children={<AuthPage />} />
            <Route path='/book/:id' children={<BookDetailPage />} />
        </Switch>
    )
}

export default Routes;