import { z } from "zod";
import { 
  userIdSchema,
  createUserSchema,
  updateUserSchema
} from "../validations/userValidations.js";
import {
  createUser as createUserService,
  getUserById as getUserByIdService,
  getAllUsers as getAllUsersService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  getUserByEmail as getUserByEmailService
} from '../services/userService.js';
import responseHandler from '../utils/responseHandler.js';
import { USER_MESSAGES } from "../config/messages/userMessages.js";
import { CODE } from "../config/statusCodes/codes.js";
import { logError } from "../services/error/errorLogService.js";

async function createUser(req, res) {
  try {
    const validatedData = await createUserSchema.parseAsync(req.body);
    const throwErrorIfNotFound = false;
    const existingUser = await getUserByEmailService(validatedData.email, throwErrorIfNotFound);
    if (existingUser) {
      throw { 
        statusCode: CODE.BAD_REQUEST, 
        message: USER_MESSAGES.USER_ALREADY_EXISTS 
      };
    }
    const user = await createUserService(validatedData);
    responseHandler.success(res, {
      statusCode: CODE.CREATED,
      message: USER_MESSAGES.USER_CREATED,
      data: user
    });
  } catch (error) {
    await logError(error, req)
    responseHandler.error(res, error);
  }
}

async function getUser(req, res) {
  try {
    const user = await getUserByIdService(req.params.id);
    responseHandler.success(res, {
      statusCode: CODE.SUCCESS,
      message: USER_MESSAGES.USER_FETCHED,
      data: user
    });
  } catch (error) {
    await logError(error, req)
    responseHandler.error(res, error)
  }
}

async function getUsers(req, res) {
  try {
    const currentUser = req.user;
    // console.log('Current User:', currentUser);
    const users = await getAllUsersService();
    responseHandler.success(res, {
      statusCode: CODE.SUCCESS,
      message: USER_MESSAGES.USERS_FETCHED,
      data: users
    });
  } catch (error) {
    await logError(error, req)
    responseHandler.error(res, error)
  }
}


async function updateUser(req, res) {
  try {
    const id = userIdSchema.parse(req.params.id);
    const userExists = await getUserByIdService(id);
    
    if (!userExists) {
      throw { 
        statusCode: CODE.NOT_FOUND, 
        message: USER_MESSAGES.USER_NOT_FOUND
      };
    }

    const validatedData = await updateUserSchema(id).parseAsync(req.body);
    const user = await updateUserService(id, validatedData);
    const { password, ...safeUserData } = user;

    const data = {
      user: safeUserData,
      address: null,
      qualifications: []
    };

    responseHandler.success(res, {
      statusCode: CODE.SUCCESS,
      message: USER_MESSAGES.USER_UPDATED,
      data
    });

  } catch (error) {
    await logError(error, req)
    responseHandler.error(res, error);
  }
}

async function deleteUser(req, res) {
  try {
    const id = userIdSchema.parse(req.params.id);
    const userExists = await getUserByIdService(id);
    if (!userExists) {
      throw { 
        statusCode: CODE.NOT_FOUND, 
        message: USER_MESSAGES.USER_NOT_FOUND
      };
    }
    await deleteUserService(id);
    responseHandler.success(res, {
      statusCode: CODE.NO_CONTENT,
      message: USER_MESSAGES.USER_DELETED
    });
  } catch (error) {
    await logError(error, req)
    responseHandler.error(res, error);
  }
}

export {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
};