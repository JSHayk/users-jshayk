import express from "express";
import cors from "cors"

let users = [
    {
        id: 1,
        name: "Jack",
        job: "Programmer"
    },
    {
        id: 2,
        name: "Mike",
        job: "Designer"
    },
    {
        id: 3,
        name: "Clark",
        job: "Student"
    },
]

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.get("/users", (req, res) => {
    res.status(200).send(users);
});

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    users = users.filter(user => user.id != id);
    res.status(200).send({message: "The user was deleted!"})
})


app.post("/users", (req, res) => {
    const { name, job } = req.body;
    console.log(req.body)
    users.push({
        id: Math.floor(Math.random() * 100),
        name,
        job
    });
    res.status(200).send({ message: "The user was added" });
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id);
    if (!user) {
        return res.status(400).send({
            message: "There is no user!"
        })
    }
    res.status(200).send(user);
});

app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const {name, job} = req.body;
    users = users.map(user => {
        if (user.id == id) {
            user.name = name;
            user.job = job;
        }
        return user;
    });
    res.status(200).send({message: "The user was edited!А"})
})


app.listen(4000, () => console.log(`Server run on 4000`))