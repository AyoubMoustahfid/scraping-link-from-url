import { Router } from "express"
import { crawler } from "../controllers/crawler.controller"

const router = Router()

router.post("/",  (req, res) => {
  try {
    console.log('hello')
    const query =  crawler()
    res.send(query)
  } catch (e) {
    res.send(e)
  }
})

export const crawlerRoute = router