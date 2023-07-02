import express from "express";
const router = express.Router();

import {
  login,
  register,
  getuserList,
  registerUser,
  editUser,
  deleteUser,
  logout,
  getuser,
  addreportFormat,
  getSingleUser,
} from "../controllers/admin.js";

import { requireSignIn } from "../middleware/requireSignIn.js";
import {
  assigncollection,
  deletePatience,
  deletePatienceCard,
  deleteReportFormat,
  editPatienceCard,
  getPatienceCard,
  getPatientsBySubcategory,
  getReportFormat,
  getSinglePatience,
  getpatienceList,
  registerPatience,
  registerPatienceCard,
  updatePatientReport,
} from "../controllers/patience/patience.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/addreportformat", requireSignIn, addreportFormat);
router.get("/getreportformat/:page/:limit", requireSignIn, getReportFormat);
router.delete("/deletereportformat/:id", requireSignIn, deleteReportFormat);


router.post("/register-patience", requireSignIn, registerPatience);
router.get("/getpatiencelist/:page/:limit", requireSignIn, getpatienceList);
router.delete("/delete-patience/:id", requireSignIn, deletePatience);
router.get("/get-patience/:phone", requireSignIn, getSinglePatience);

router.get("/get-patientby-subcategory/:id/:phone", requireSignIn, getPatientsBySubcategory);
router.post("/update-patient-report", requireSignIn, updatePatientReport);



+


router.post("/register-patience-card", requireSignIn, registerPatienceCard);
router.get("/get-patience-card", requireSignIn, getPatienceCard);
router.put("/edit-patience-card/:id", requireSignIn, editPatienceCard);
router.delete("/delete-patience-card/:id", requireSignIn, deletePatienceCard);






router.post("/assigncollection", requireSignIn, assigncollection);


router.post("/register-user", requireSignIn, registerUser);
router.get("/getuserlist", requireSignIn, getuserList);
router.get("/getuserlist/:id", requireSignIn, getSingleUser);

router.get("/searchuserlist/:name", requireSignIn, getuser);
router.put("/edit-user/:id", requireSignIn, editUser);
router.delete("/delete-user/:id", requireSignIn, deleteUser);

export default router;
