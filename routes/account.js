import express from "express";
const router = express.Router();

import { requireSignIn } from "../middleware/requireSignIn.js";
import { addNewAccount, deleteAccount, editAccount, getAllAccount, getsingleAccount } from "../controllers/account/account.js";


router.post("/addnewaccount", requireSignIn, addNewAccount);
router.delete("/deleteaccount/:id", requireSignIn, deleteAccount);
router.put("/editaccount/:id", requireSignIn, editAccount);
router.get("/getaccountdetails", requireSignIn, getAllAccount);
router.get("/getaccountdetails/:id", requireSignIn, getsingleAccount);







export default router;
