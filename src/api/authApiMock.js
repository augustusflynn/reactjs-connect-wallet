class AuthApiMock {
  loginManualMock(loginInfo) {
    return new Promise((resolve, reject) => {
      return resolve({
        success: true,
        data: { user: { xmppId: 'liem123gyhjbgyuhgbyu', id: 34556 }, token: '5679889iy1765ghgsdtyjhgyuwdyiuhu' },
        message: 'login success',
      });
    });
  }
  logout() {
    return new Promise((resolve, reject) => {
      return resolve({
        success: true,
        data: {},
      });
    });
  }
}

export default new AuthApiMock();
