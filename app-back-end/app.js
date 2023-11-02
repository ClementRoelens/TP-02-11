const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())

const recipeData = JSON.parse(fs.readFileSync('recipe.json'))
const userData = JSON.parse(fs.readFileSync('user.json'))
const ingredientData = JSON.parse(fs.readFileSync('ingredient.json'))

app.get('')