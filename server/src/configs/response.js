import { logError } from "./logger.js";
import { messageGeneral } from "./messages.js";

export class ApiResponse {
  static sendResponse(res, statusCode, data = null) {
    return res.status(statusCode).json(data);
  }

  static OK(res, data) {
    return this.sendResponse(res, 200, data);
  }

  static Accepted(res, data) {
    return this.sendResponse(res, 202, data);
  }

  static Created(res, data) {
    return this.sendResponse(res, 201, data);
  }

  static BadRequest(res, message = messageGeneral.BAD_REQUEST) {
    return this.sendResponse(res, 400, { message });
  }

  static Unauthorized(res, message = messageGeneral.UNAUTHORIZED) {
    return this.sendResponse(res, 401, { message });
  }

  static Forbidden(res, message = messageGeneral.ACCESS_DENIED) {
    return this.sendResponse(res, 403, { message });
  }

  static NotFound(res, message = messageGeneral.NOT_FOUND) {
    return this.sendResponse(res, 404, { message });
  }

  static TooManyRequests(res, message = messageGeneral.TOO_MANY_REQUESTS) {
    return this.sendResponse(res, 429, { message });
  }

  static InternalServerError(res, err, message = messageGeneral.SOMETHING_WRONG) {
    if (err) {
      logError(err);
    }
    return this.sendResponse(res, 500, { message });
  }

  static ServiceUnavailable(res, message = messageGeneral.SERVICE_UNAVAILABLE) {
    return this.sendResponse(res, 503, { message });
  }
}
