import { connect } from 'react-redux';
import { DashboardView } from '../views';
import { loginActions } from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginUser: state.loginReducer,
  };
};

const mapDispatchToProps = {
  logout: loginActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
