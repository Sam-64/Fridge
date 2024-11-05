export interface Recipe {
    id: string;
    name: string;
    description: string;
    cookingTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    ingredients: RecipeIngredient[];
    instructions: string[];
    imageUrl: string;
    category: string;
    tags: string[];
}

export interface RecipeIngredient {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    isAvailable: boolean;
}