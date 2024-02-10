const hasNumber = /\d/;

const Auth = ({ userName, password }) => {
  // console.log(userName , password)
    if (userName.length !== 8 || password.length !== 8) {
      return {
        errMsg: "Username or Password should have 8 characters.",
        isError: true,
      };
    } else {
      if (hasNumber.test(userName.charAt(0))) {
        return {
          errMsg: "Username should not start with number.",
          isError: true,
        };
      } else {
        return {
          errMsg: "",
          isError: false,
        };
      }
    }
};

export default Auth;
