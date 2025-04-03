'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'

const EditRecipe = () => {
    const router = useRouter()
    const params = useParams()
    const { user } = useAuth()
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        servings: 1,
        prep_time_hours: 0,
        prep_time_minutes: 0,
        cook_time_hours: 0,
        cook_time_minutes: 0,
        calories: 0,
        categories: [],
        image_url: 'http://localhost:3000/images/recipes/no-dish-placeholder.jpeg'
    })

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories')
                setCategories(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }
        fetchCategories()

        // Fetch recipe data
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/api/recipes/slug/${params.slug}`)
                const recipe = response.data
                
                // Set form data with recipe values
                setFormData({
                    title: recipe.title,
                    description: recipe.description,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    servings: recipe.servings,
                    prep_time_hours: recipe.prep_time_hours,
                    prep_time_minutes: recipe.prep_time_minutes,
                    cook_time_hours: recipe.cook_time_hours,
                    cook_time_minutes: recipe.cook_time_minutes,
                    calories: recipe.calories,
                    categories: recipe.categories.map(cat => cat.id),
                    image_url: recipe.image_url
                })
            } catch (error) {
                console.error('Error fetching recipe:', error)
                setErrors({ general: 'Error loading recipe data' })
            }
        }
        fetchRecipe()
    }, [params.slug])

    const handleChange = (e) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }))
        }
    }

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value))
        setFormData(prev => ({
            ...prev,
            categories: selectedOptions
        }))
    }

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        try {
            const slug = generateSlug(formData.title)
            await axios.put(`/api/recipes/slug/${params.slug}`, {
                ...formData,
                user_id: user.id,
                slug
            })

            // Show success message and redirect
            router.push(`/recipe/${slug}?success=Recipe updated successfully`)
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors({ general: 'An error occurred while updating the recipe' })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>

            {errors.general && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="block mt-1 w-full"
                        required
                    />
                    <InputError messages={errors.title} className="mt-2" />
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows="3"
                        required
                    />
                    <InputError messages={errors.description} className="mt-2" />
                </div>

                {/* Ingredients */}
                <div>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows="5"
                        required
                    />
                    <InputError messages={errors.ingredients} className="mt-2" />
                </div>

                {/* Instructions */}
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows="5"
                        required
                    />
                    <InputError messages={errors.instructions} className="mt-2" />
                </div>

                {/* Servings */}
                <div>
                    <Label htmlFor="servings">Servings</Label>
                    <Input
                        id="servings"
                        name="servings"
                        type="number"
                        min="1"
                        max="8"
                        value={formData.servings}
                        onChange={handleChange}
                        className="block mt-1 w-full"
                        required
                    />
                    <InputError messages={errors.servings} className="mt-2" />
                </div>

                {/* Preparation Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="prep_time_hours">Prep Time (Hours)</Label>
                        <Input
                            id="prep_time_hours"
                            name="prep_time_hours"
                            type="number"
                            min="0"
                            value={formData.prep_time_hours}
                            onChange={handleChange}
                            className="block mt-1 w-full"
                            required
                        />
                        <InputError messages={errors.prep_time_hours} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="prep_time_minutes">Prep Time (Minutes)</Label>
                        <Input
                            id="prep_time_minutes"
                            name="prep_time_minutes"
                            type="number"
                            min="0"
                            max="59"
                            value={formData.prep_time_minutes}
                            onChange={handleChange}
                            className="block mt-1 w-full"
                            required
                        />
                        <InputError messages={errors.prep_time_minutes} className="mt-2" />
                    </div>
                </div>

                {/* Cook Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="cook_time_hours">Cook Time (Hours)</Label>
                        <Input
                            id="cook_time_hours"
                            name="cook_time_hours"
                            type="number"
                            min="0"
                            value={formData.cook_time_hours}
                            onChange={handleChange}
                            className="block mt-1 w-full"
                            required
                        />
                        <InputError messages={errors.cook_time_hours} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="cook_time_minutes">Cook Time (Minutes)</Label>
                        <Input
                            id="cook_time_minutes"
                            name="cook_time_minutes"
                            type="number"
                            min="0"
                            max="59"
                            value={formData.cook_time_minutes}
                            onChange={handleChange}
                            className="block mt-1 w-full"
                            required
                        />
                        <InputError messages={errors.cook_time_minutes} className="mt-2" />
                    </div>
                </div>

                {/* Calories */}
                <div>
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                        id="calories"
                        name="calories"
                        type="number"
                        min="0"
                        value={formData.calories}
                        onChange={handleChange}
                        className="block mt-1 w-full"
                        required
                    />
                    <InputError messages={errors.calories} className="mt-2" />
                </div>

                {/* Categories */}
                <div>
                    <Label htmlFor="categories">Categories</Label>
                    <select
                        id="categories"
                        name="categories"
                        multiple
                        value={formData.categories}
                        onChange={handleCategoryChange}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <InputError messages={errors.categories} className="mt-2" />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update Recipe'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditRecipe 