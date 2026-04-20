import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { messageInvalid } from "../configs/messages.js";

export const objectIdSchema =
  z.object({
    params: z.object({
      id: z.string().refine(isValidObjectId, { message: messageInvalid("ID") }),
    }),
  });
