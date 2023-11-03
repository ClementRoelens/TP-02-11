const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())

let recipeData = JSON.parse(fs.readFileSync('recipe.json'))
let ingredientData = JSON.parse(fs.readFileSync('ingredient.json'))

app.get('/recipes', (req, res) => {
    res.json(recipeData);
})

app.get('/recipe/:id', (req, res) => {
    const recipeId = parseInt(req.params.id)
    console.log(recipeData.recipes)
    const recipe = recipeData.recipes.find(recipe => recipe.id === recipeId)
    if (recipe) {
        res.json(recipe)
    } else {
        res.status(404).json({ message: 'recette non trouvée' })
    }
})

app.post('/recipes', (req, res) => {
    const newRecipe = req.body
    recipeData.recipes.push(newRecipe)
    fs.writeFileSync('recipe.json', JSON.stringify(recipeData, null, 2))
    res.status(201).json(newRecipe)
})

app.put('/recipe/:id', (req, res) => {
    const newRecipeValue = req.body
    recipeData.recipes = recipeData.recipes.map(recipe => recipe.id === req.params.id ? newRecipeValue : recipe)
    console.log(recipeData)

    fs.writeFileSync('recipe.json', JSON.stringify(recipeData, null, 2))
    res.status(200).json(newRecipeValue)
})

app.delete('/recipe/:id', (req, res) => {
    recipeData.recipes = recipeData.recipes.filter(recipe => recipe.id !== parseInt(req.params.id));
    console.log(recipeData);
    fs.writeFileSync('recipe.json', JSON.stringify(recipeData, null, 2));
    res.status(204).end()
})





app.get('/ingredients', (req, res) => {
    res.json(ingredientData);
})

app.get('/ingredient/:id', (req, res) => {
    const ingredientId = req.params.id
    const ingredient = ingredientData.ingredients.find(ingredient => ingredient.id === ingredientId)
    if (ingredient) {
        res.json(ingredient)
    } else {
        res.status(404).json({ message: 'ingredient non trouvée' })
    }
})

app.post('/ingredients', (req, res) => {
    const newIngredient = req.body
    ingredientData.ingredients.push(newIngredient)
    fs.writeFileSync('ingredient.json', JSON.stringify(ingredientData, null, 2))
    res.status(201).json(newIngredient)
})

app.put('/ingredient/:id', (req, res) => {
    const newIngredientValue = req.body
    ingredientData.ingredients = ingredientData.ingredients.map(ingredient => ingredient.id === req.params.id ? newIngredientValue : ingredient)
    console.log(ingredientData)

    fs.writeFileSync('ingredient.json', JSON.stringify(ingredientData, null, 2))
    res.status(200).json(newIngredientValue)
})

app.delete('/ingredient/:id', (req, res) => {
    ingredientData.ingredients = ingredientData.ingredients.filter(ingredient => ingredient.id !== req.params.id);
    console.log(ingredientData);
    fs.writeFileSync('ingredient.json', JSON.stringify(ingredientData, null, 2));
    res.status(204).end()
})








app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});