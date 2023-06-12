import Shop from "./Shop";

type AuthenticationResult = {
  accessToken: string;
  expiresIn: number;
  userFullName: string;
  shop: Shop;
};

export default AuthenticationResult;
