const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())

const recipeData = JSON.parse(fs.readFileSync('recipe.json'))
const ingredientData = JSON.parse(fs.readFileSync('ingredient.json'))

app.get('/recipes', (req, res) =>{
    res.json(recipeData);
})

app.get('/recipe/:id', (req,res) => {
    const recipeId = parseInt(req.params.id)
    console.log(recipeData.recipes)
    const recipe = recipeData.recipes.find(recipe => recipe.id === recipeId)
    if (recipe){
        res.json(recipe)
    } else{
        res.status(404).json({message : 'recette non trouvée'})
    }
})

app.post('/recipes', (req,res) => {
    const newRecipe = req.body
    recipeData.recipes.push(newRecipe)
    fs.writeFileSync('recipe.json', JSON.stringify(recipeData, null,2))
    res.status(201).json(newRecipe)
})









app.get('/ingredients', (req, res) =>{
    res.json(ingredientData);
})

app.get('/ingredient/:id', (req,res) => {
    const ingredientId = req.params.id
    const ingredient = ingredientData.ingredients.find(ingredient => ingredient.id === ingredientId)
    if (ingredient){
        res.json(ingredient)
    } else{
        res.status(404).json({message : 'ingredient non trouvée'})
    }
})

app.post('/ingredients', (req,res) =>{
    const newIngredient = parseInt(req.params.id)
    ingredientData.ingredients.push(newIngredient)
    fs.writeFileSync('ingredient.json', JSON.stringify(ingredientData, null, 2))
    res.status(201).json(newIngredient)
})

app.put({})

app.delete({})








app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });