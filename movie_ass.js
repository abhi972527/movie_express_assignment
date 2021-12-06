const express = require("express");
const mongoose = require("mongoose");


const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment")
};


const movieSchema = new mongoose.Schema({
    movie_name: {type: String, required: true},
    movie_genre: { type: String, required: true },
    production_year: { type: Number, required: true },
    budget: { type: Number, required: true },
}, {
    versionKey: false,
    timestamps: true,
});

const Movies = mongoose.model("movies", movieSchema);

const app = express();

app.use(express.json());



app.get("/movies", async (req, res) => {
    // thennable
    try {
        const movies = await Movies.find().lean().exec();
        return res.send({ movies });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});



app.post("/movies", async (req, res) => {
    // thennable
    try {
        const movies = await Movies.create(req.body);
        return res.status(201).send( movies );
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});



app.get("/movies/:id", async (req, res) => {
    try {
        const movies = await Movies.findById(req.params.id).lean().exec();
        return res.send({ movies });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});


app.patch("/movies/:id", async (req, res) => {
    try {
        const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
        return res.status(201).send(movie);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})


app.delete("/movies/:id", async (req, res) => {
    try {
        const movie = await Movies.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(movie);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})





app.listen(2345, async function(){
    await connect();
    console.log("listening on port 2345");
})