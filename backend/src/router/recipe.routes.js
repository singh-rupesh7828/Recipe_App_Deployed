import express from "express"
import {createrecipe, FetchAllRecipe, findoneRecipe, updatRecipe, deleteRecipe, genrateRecipe} from "../Controller/recipe.controller.js"
import { middleware } from "../middleware/auth.middleware.js"
import upload from "../middleware/multer.middleware.js";


const Router = express.Router()

Router.post("/CreateRecipe",middleware, upload.single("image"),createrecipe)
Router.get("/getAllRecipe",middleware,FetchAllRecipe)
Router.get("/getoneRecipe/:id",middleware,findoneRecipe)
Router.put("/updateRecipe/:id",middleware,updatRecipe)
Router.delete("/deleteRecipe/:id",middleware,deleteRecipe)
Router.post("/GenrateRecipe",middleware,genrateRecipe)


export default Router