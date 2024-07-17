const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use EJS as a view engine
app.set('view engine', 'ejs');

// Static file
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});



app.get('/', (req, res) => {
    res.render('index'); // Assuming you have an index.ejs file
  });


  // Define the route for /index
app.get('/index', (req, res) => {
    res.render('index'); // Render index.ejs for /index path
  });
  

app.get('/about', (req, res) => {
    res.render('about'); // Render about.ejs
  });

app.get("/contact", (req, res) => {
    res.render("contact"); // Render contact.ejs
  });

app.get("/single-product", (req, res) => {
    res.render("single-product"); // Render contact.ejs
});



// Register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    try {
        // Check if the user already exists
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            return res.status(400).send("User already exists. Please create a new one.");
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; // Replace hashed password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error signing up");
    }
});





// Login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.status(400).send("Username not found");
        }

        // Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("index");
        } else {
            res.status(400).send("Wrong password");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Wrong details");
    }
});



const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
