import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import {
  isEmptyBody,
  isValidId,
  isEmptyFavoriteBody,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateValidate = validateBody(contactUpdateSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactUpdateValidate,
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyFavoriteBody,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

export default contactsRouter;
