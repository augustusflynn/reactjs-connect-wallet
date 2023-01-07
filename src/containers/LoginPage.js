import { connect } from 'react-redux';
import { LoginView } from '../views';
import { loginActions } from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginUser: state.loginReducer,
  };
};

const mapDispatchToProps = {
  loginManual: loginActions.loginManual,
  loginManualMock: loginActions.loginManualMock,
  setMemberDetail: loginActions.setMemberDetail,
  getMemberDetail: loginActions.getMemberDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
