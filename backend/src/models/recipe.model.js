import mongoose from "mongoose"


const recieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    image: {
        url: String,
        fileId: String
    },

    discription: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true,
    },
    recipe: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const recipemodel = mongoose.model("recipe", recieSchema)

export default recipemodel