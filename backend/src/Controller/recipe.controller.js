import recipemodel from "../models/recipe.model.js";
import { generateRecipeFromGemini } from "../services/gemini.services.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";


export const createrecipe = async (req, res) => {
    const { title, discription, ingredients, recipe } = req.body
    const imgUrl = req.file

    if (!title) {
        return res.status(401).json({
            message: "Title not found"
        })
    }

    if (!imgUrl) {
        return res.status(400).json({
            message: "Recipe image is required"
        });
    }

    const imagekit = new ImageKit({
        privateKey: config.privateKey
    });

    const uploadResponse = await imagekit.files.upload({
        file: await toFile(
            req.file.buffer,
            req.file.originalname
        ),
        fileName: imgUrl.originalname,
        folder: "/recipes"
    });

    const createrecipe = await recipemodel.create({
        title,
        discription,
        ingredients,
        recipe,
        user: req.user.user,

        image: {
            url: uploadResponse.url,
            fileId: uploadResponse.fileId
        }
    })

    res.status(200).json({
        message: "recipe saved succesfully",
        recipe: {
            title,
            ingredients,
            recipe,
            user: req.user.userId
        }
    })

}


export const FetchAllRecipe = async (req, res) => {
    const userid = req.user.user

    if (!userid) {
        return res.status(401).json({
            message: "userID not found"
        })
    }

    const findRecipe = await recipemodel.find({ user: userid })

    res.status(200).json({
        message: "user recipe found",
        recipe: findRecipe
    })
}

export const findoneRecipe = async (req, res) => {
    const { id } = req.params
    const user = req.user.user

    if (!user) {
        return res.status(401).json({
            message: "Found Error while serching for recipe please signin again"

        })
    }

    const findone = await recipemodel.findOne({
        _id: id,
        user: user
    })
    console.log("Recipe ID:", id)
    console.log("Logged in User:", user)

    res.status(200).json({
        message: "recipe fetched succesfully",
        recipe: findone
    })
}

export const updatRecipe = async (req, res) => {
    const { id } = req.params
    const { title, ingredients, recipe, discription } = req.body

    if (!id) {
        return res.status(401).json({
            message: "Id not found",
        })

    }


    const user = req.user.user

    const findRecipe = await recipemodel.findOne({
        _id: id,
        user: user
    })
    if (!findRecipe) {
        return res.status(401).json({
            message: "Recipe not found"
        })
    }

    const updatRecipe = await recipemodel.findByIdAndUpdate(id, {
        $set: {
            title,
            ingredients,
            recipe,
            discription
        }

    },
        {
            returnDocument: "after",
            runValidators: true
        }
    )

    res.status(200).json({
        message: "recipe updated succesfully",
        title: title,
        ingredients: ingredients,
        recipe: recipe,
        discription: discription
    })
}


export const deleteRecipe = async (req, res) => {
    const { id } = req.params
    const user = req.user.user

    if (!id) {
        return res.status(401).json({
            message: "Id not found"
        })
    }

    const findRecipe = await recipemodel.findOne({ _id: id, user: user })

    if (!findRecipe) {
        return res.status(401).json({
            message: "Recipe not found"
        })
    }

    const deleteRecipe = await recipemodel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Recipe deleted succesfully"
    })
}


export const genrateRecipe = async (req, res) => {
    const { ingredients } = req.body

    const recipe = await generateRecipeFromGemini(ingredients)

    res.status(200).json({
        message: "recipe genrated succesfully",
        recipe
    })
}