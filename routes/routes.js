import { Router } from "express"
import { crawlerRoute } from "./crawler.route"

const router = Router()

router.use("/crawl", crawlerRoute)

export { router }
