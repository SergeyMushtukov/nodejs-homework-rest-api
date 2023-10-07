import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../schemas/contacts-schemas.js";

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateValidate = validateBody(contactUpdateSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactsRouter.delete("/:contactId", contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  contactUpdateValidate,
  contactsController.updateById
);

export default contactsRouter;
