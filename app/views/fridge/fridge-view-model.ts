import { Observable } from '@nativescript/core';
import { Ingredient } from '../../models/ingredient';

export class FridgeViewModel extends Observable {
    private _ingredients: Array<Ingredient>;
    private _searchQuery: string;

    constructor() {
        super();
        this._ingredients = [];
        this._searchQuery = '';
        this.loadIngredients();
    }

    get ingredients(): Array<Ingredient> {
        return this._ingredients;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
            this.filterIngredients();
        }
    }

    private loadIngredients() {
        // Mock data - Replace with actual API calls
        this._ingredients = [
            {
                id: '1',
                name: 'Latte',
                category: 'dairy',
                categoryIcon: '~/assets/icons/dairy.png',
                expiryDate: '2024-04-10',
                quantity: 1,
                unit: 'L',
                expiryStatus: this.calculateExpiryStatus('2024-04-10')
            },
            {
                id: '2',
                name: 'Pomodori',
                category: 'vegetables',
                categoryIcon: '~/assets/icons/vegetables.png',
                expiryDate: '2024-04-05',
                quantity: 500,
                unit: 'g',
                expiryStatus: this.calculateExpiryStatus('2024-04-05')
            }
        ];
        this.notifyPropertyChange('ingredients', this._ingredients);
    }

    private calculateExpiryStatus(expiryDate: string): string {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));

        if (daysUntilExpiry < 0) return 'expired';
        if (daysUntilExpiry <= 3) return 'expiring-soon';
        return 'fresh';
    }

    private filterIngredients() {
        if (!this._searchQuery) {
            this.loadIngredients();
            return;
        }

        const query = this._searchQuery.toLowerCase();
        this._ingredients = this._ingredients.filter(item => 
            item.name.toLowerCase().includes(query)
        );
        this.notifyPropertyChange('ingredients', this._ingredients);
    }
}