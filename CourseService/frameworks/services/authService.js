import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export default function authService() {
  const verify = (token) => jwt.verify(token, config.jwtSecret);

  return {
    verify,
  };
}
