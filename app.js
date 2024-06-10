const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 8080

const schemaData = mongoose.Schema({
    projectname: String,
    authername: String,
    visitURL:String,

}, { timestamps: true });

const projectModal = mongoose.model("project", schemaData)



app.get("/", async (req, res) => {
    const data = await projectModal.find({})
    res.json({ success: true, data: data })
})

app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new projectModal(req.body)
    await data.save()
    res.send({ success: true, message: "data saved successfully!", data: data })
})

app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    const data = await projectModal.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated!", data: data })
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await projectModal.deleteOne({ _id: id })
    res.send({ success: true, message: "data deleted!", data: data })
})

mongoose.connect("mongodb+srv://sanjaysharma28111997:W7NNEtPoAmz4s8Fs@cluster0.8sdt7mz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",)
    .then(() => {
        console.log(`Connect DB`)
        app.listen(PORT, () => console.log("Server is running"));
    })
    .catch((err) => console.log(err))



