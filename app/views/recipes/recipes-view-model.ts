import { Observable } from '@nativescript/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe-service';

export class RecipesViewModel extends Observable {
    private _recipes: Array<Recipe>;
    private _searchQuery: string;
    private _selectedCategory: string;
    private recipeService: RecipeService;

    constructor() {
        super();
        this._recipes = [];
        this._searchQuery = '';
        this._selectedCategory = 'all';
        this.recipeService = new RecipeService();
        this.loadRecipes();
    }

    get recipes(): Array<Recipe> {
        return this._recipes;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
            this.filterRecipes();
        }
    }

    onCategoryTap(args: any) {
        const button = args.object;
        this._selectedCategory = button.text.toLowerCase();
        this.filterRecipes();
    }

    onRecipeTap(args: any) {
        const recipe = args.view.bindingContext;
        // Navigate to recipe detail page
        // TODO: Implement navigation
    }

    onFavoriteTap(args: any) {
        const recipe = args.view.bindingContext;
        recipe.isFavorite = !recipe.isFavorite;
        this.recipeService.toggleFavorite(recipe.id);
        this.notifyPropertyChange('recipes', this._recipes);
    }

    private async loadRecipes() {
        this._recipes = await this.recipeService.getRecipes();
        this.notifyPropertyChange('recipes', this._recipes);
    }

    private filterRecipes() {
        let filteredRecipes = this._recipes;

        if (this._searchQuery) {
            const query = this._searchQuery.toLowerCase();
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.name.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query)
            );
        }

        switch (this._selectedCategory) {
            case 'con ingredienti disponibili':
                filteredRecipes = filteredRecipes.filter(recipe => 
                    recipe.availableIngredients === recipe.totalIngredients
                );
                break;
            case 'preferiti':
                filteredRecipes = filteredRecipes.filter(recipe => recipe.isFavorite);
                break;
        }

        this._recipes = filteredRecipes;
        this.notifyPropertyChange('recipes', this._recipes);
    }
}