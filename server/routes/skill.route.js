import {Router} from "express"
import { addSkill, getSkill, removeSkill } from "../controllers/skill.controller.js"
const router = Router()

router.route('/get').get(getSkill)
router.route('/add').post(addSkill)
router.route('/remove/:skillId').delete(removeSkill)


export default router