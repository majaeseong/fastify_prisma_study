import db from "../lib/db";
import {
  generateHash,
  duplicateVerifyUser,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../lib/authHelper";
import { ERROR_MESSAGE } from "../lib/constants";

function authService() {
  const register = async (email: string, pwd: string) => {
    try {
      await duplicateVerifyUser(email);

      const hashPwd = generateHash(pwd);

      const values = {
        email,
        password: hashPwd,
      };

      const newUser = await db.user.create({
        data: values,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, pwd: string) => {
    try {
      const user = await db.user.findUnique({
        select: {
          id: true,
          email: true,
        },
        where: {
          email,
        },
      });
      if (!user) {
        throw ERROR_MESSAGE.unauthorized;
      }

      const pwdCheck = await verifyPassword(email, pwd);
      if (!pwdCheck) {
        throw ERROR_MESSAGE.unauthorized;
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      const values = {
        userId: user.id,
        refreshToken,
      };

      await db.token.create({
        data: values,
      });

      return {
        ...user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  };

  const logout = async (refreshToken: string) => {
    try {
      return await db.token.deleteMany({
        where: {
          refreshToken,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const refresh = async (refreshToken: string) => {
    try {
      if (!refreshToken) {
        throw ERROR_MESSAGE.unauthorized;
      }
      const user = await verifyRefreshToken(refreshToken);

      const userInfo = {
        id: user.id,
        email: user.email,
      };
      const access_token = generateAccessToken(userInfo);

      return {
        ...userInfo,
        Authorization: access_token,
      };
    } catch (error) {
      throw error;
    }
  };

  return {
    register,
    login,
    logout,
    refresh,
  };
}

export default authService();
