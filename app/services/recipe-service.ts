import { Recipe } from '../models/recipe';

export class RecipeService {
    private recipes: Recipe[];

    constructor() {
        // Mock data - Replace with actual API calls
        this.recipes = [
            {
                id: '1',
                name: 'Pasta al Pomodoro',
                description: 'Una classica pasta al pomodoro italiana',
                cookingTime: 20,
                difficulty: 'easy',
                ingredients: [
                    {
                        id: '1',
                        name: 'Pasta',
                        quantity: 100,
                        unit: 'g',
                        isAvailable: true
                    },
                    {
                        id: '2',
                        name: 'Pomodori',
                        quantity: 200,
                        unit: 'g',
                        isAvailable: true
                    }
                ],
                instructions: [
                    'Bolli l\'acqua',
                    'Cuoci la pasta',
                    'Prepara il sugo'
                ],
                imageUrl: '~/assets/images/pasta.jpg',
                category: 'primi',
                tags: ['pasta', 'vegetariano'],
                isFavorite: false,
                availableIngredients: 2,
                totalIngredients: 2
            }
        ];
    }

    async getRecipes(): Promise<Recipe[]> {
        // Simulate API call
        return Promise.resolve(this.recipes);
    }

    async toggleFavorite(recipeId: string): Promise<void> {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe) {
            recipe.isFavorite = !recipe.isFavorite;
        }
    }

    async getRecipeById(id: string): Promise<Recipe | undefined> {
        return this.recipes.find(r => r.id === id);
    }
}