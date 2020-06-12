import express from "express";

import GradesController from "../controllers/GradesController.js";

const router = express.Router();

router.get("/", GradesController.index);
router.get("/:id", GradesController.find);
router.put("/:id", GradesController.update);
router.post("/", GradesController.store);
router.delete("/:id", GradesController.delete);

router.get("/:student/:subject/total", GradesController.totalGrade);
router.get("/:type/:subject/avg", GradesController.avgGrade);
router.get("/:type/:subject/best", GradesController.bestGrade);

export default router;
