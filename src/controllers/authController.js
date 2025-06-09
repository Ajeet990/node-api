import { 
    loginUserSchema,
    registerUserSchema
} from "../validations/userValidations.js";
import { 
    loginUser as loginUserService,
    createUser as registerUserService
} from '../services/authService.js';
import responseHandler from '../utils/responseHandler.js';
import { CODE } from "../config/statusCodes/codes.js";
import { AUTH_MESSAGES } from "../config/messages/authMessages.js";
import { logError } from "../services/error/errorLogService.js";
import { invalidateToken } from "../services/tokenService.js";

async function loginUser(req, res) {
  try {
    const validatedData = await loginUserSchema.parseAsync(req.body);
    const user = await loginUserService(validatedData);
    
    if (!user) {
      throw { 
        statusCode: CODE.UNAUTHORIZED, 
        message: AUTH_MESSAGES.INVALID_CREDENTIALS 
      };
    }
    responseHandler.success(res, {
      statusCode: CODE.SUCCESS,
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: user
    });
  } catch (error) {
    await logError(error, req);
    responseHandler.error(res, error);
  }
}

// const logoutUser = async (req, res) => {
async function logoutUser(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error(AUTH_MESSAGES.TOKEN_REQUIRED);

    await invalidateToken(token); // Add to blacklist

    res.status(200).json({ 
      success: true,
      statusCode: CODE.SUCCESS,
      message: AUTH_MESSAGES.LOGOUT_SUCCESS
    });
  } catch (error) {
    await logError(error, req);
    res.status(400).json({ success: false, message: error.message });
  }
};

async function registerUser(req, res) {
  try {
    const validatedData = await registerUserSchema.parseAsync(req.body);
    const user = await registerUserService(validatedData);
    if (!user) {
      throw { 
        statusCode: CODE.BAD_REQUEST, 
        message: AUTH_MESSAGES.REGISTER_FAILURE 
      };
    }
    const data = {
        user:user
    }
    // data.token = "aaaa";
    responseHandler.success(res, {
      statusCode: CODE.CREATED,
      message: AUTH_MESSAGES.REGISTER_SUCCESS,
      data
    });
  } catch (error) {
    await logError(error, req);
    responseHandler.error(res, error);
  }
}
export {
  loginUser,
  logoutUser,
  registerUser
};