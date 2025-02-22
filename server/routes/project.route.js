import { Router } from "express";
import {
  addProject,
  getProjects,
  removeProject,
  updateProject,
} from "../controllers/project.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/get").get(getProjects);
router.route("/add").post(upload.single("thumbnail"), addProject);
router.route("/remove/:projectId").delete(removeProject);
router.route("/update/:projectId").put(upload.single("thumbnail"),updateProject);

export default router;
