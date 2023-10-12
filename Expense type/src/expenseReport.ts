const message = 'Hello, World!\n';

const sumTwoValues = (a: number, b: number): number => a + b

const printHelloWorld = (): void => {
    process.stdout.write(message);
}

type MealTypes = keyof typeof MEALS;
type ExpenseType = "car-rental" | MealTypes;

class Expense {
    type: ExpenseType
    amount: number

    constructor(type: ExpenseType, amount: number) {
        this.type = type
        this.amount = amount
    }
}

type MealDefinition = { name: string, expenseType: ExpenseType, limit: number };

const MEALS = {
    dinner: { expenseType: 'dinner', name: 'Dinner', limit: 5000 },
    breakfast: { expenseType: 'breakfast', name: 'Breakfast', limit: 1000 },
    lunch: { expenseType: 'lunch', name: 'Lunch', limit: 2000 },
    brunch: { expenseType: 'brunch', name:'Brunch', limit: 500 },
};

export function mealForType(type: ExpenseType): MealType {
    // @ts-ignore
    return MEALS[type as string];
}

export type MealType = {
    name: string,
    expenseType: ExpenseType,
    limit: number
};

function printReport(expenses: Expense[]) {
    let totalExpenses: number = 0
    let mealExpenses: number = 0

    process.stdout.write("Expenses: " + new Date().toISOString().substr(0, 10) + "\n")


    function isMeal(type: ExpenseType) {
        return MEALS.hasOwnProperty(type);
    }

    for (const expense of expenses) {
        let mealOverExpensesMarker = " ";
        let expenseName = "Car Rental";

        if (isMeal(expense.type)) {
            const meal = mealForType(expense.type);

            mealExpenses += expense.amount
            expenseName = meal.name;
            mealOverExpensesMarker = expense.amount > meal.limit ? "X" : " "
        }

        process.stdout.write(expenseName + "\t" + expense.amount + "\t" + mealOverExpensesMarker + "\n")

        totalExpenses += expense.amount
    }

    process.stdout.write("Meal Expenses: " + mealExpenses + "\n")
    process.stdout.write("Total Expenses: " + totalExpenses + "\n")
}

export {sumTwoValues, printHelloWorld, printReport, Expense, ExpenseType}
