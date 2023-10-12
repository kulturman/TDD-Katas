import {Expense, ExpenseType, mealForType, MealType, printHelloWorld, printReport, sumTwoValues} from "../src/expenseReport";

describe(`ExpenseReport`, () => {
    it(`should keep its original behavior`, () => {
        let interceptedOutput = ""
        jest.spyOn(process.stdout, "write").mockImplementation((output: string | Uint8Array): boolean => {
            interceptedOutput += output
            return true;
        });

        const expenses = [
            new Expense("dinner", 5001),
        ];

        printReport(expenses);
        expect(interceptedOutput).toEqual("Expenses: 2023-09-22\n" + "Dinner\t5001\tX\n" + "Meal Expenses: 5001\n" + "Total Expenses: 5001\n")
    })

    function outputContainsBreakfast(intercepted: { output: string }) {
        expect(intercepted.output).toContain("Breakfast\t500");
    }

    it(`expenses_with_breakfast_print_contains_breakfast_and_amount`, () => {
        let intercepted = { output: '' };
        let expenses = arrangeWithMeal(intercepted, 'breakfast');

        printReport(expenses);

        outputContainsBreakfast(intercepted);
    });

    function outputContainsMealWithOverExpenseMarker(intercepted: { output: string }, meal: MealType) {
        expect(intercepted.output).toMatch(new RegExp(`${meal.name}\\t\\d+?\\tX`));
    }

    const mealExpensesAtLimit = [
        mealForType('breakfast'),
        mealForType('dinner'),
        mealForType('lunch'),
        mealForType('brunch'),
    ];

    function newMeal(intercepted: { output: string }, meal: MealType) {
        return arrangeWithMeal(intercepted, meal.expenseType, meal.limit + 1);
    }

    it.each(mealExpensesAtLimit)(`expenses_with_meal_over_limit_print_contains_meal_overexpense_marker_after_amount`, (meal: MealType) => {
        let intercepted = { output: '' };
        let expenses = newMeal(intercepted, meal);

        printReport(expenses);

        outputContainsMealWithOverExpenseMarker(intercepted, meal);
    });

    function arrangeWithMeal(intercepted: any, type: ExpenseType, amount: number = 500) {
        jest.spyOn(process.stdout, "write").mockImplementation((output: string | Uint8Array): boolean => {
            intercepted.output += output
            return true;
        });

        return [
            new Expense(type, amount),
        ];
    }
})

describe(`given I have this test suite`, () => {
    it(`should always output Hello, World!`, () => {
        //given
        let actualOutputData = ""
        // @ts-ignore
        jest.spyOn(process.stdout, "write").mockImplementation((data: string | Uint8Array): boolean => {
            actualOutputData += data
            return true
        })
        const expectedOutputData = "Hello, World!\n"

        // when
        printHelloWorld()

        // then
        expect(actualOutputData).toEqual(expectedOutputData)
    })

    it(`should always do the correct sum`, () => {
        // given
        const a = 2, b = 3
        const expectedValue = 5

        // when
        const actualValue = sumTwoValues(a, b)

        // then
        expect(actualValue).toEqual(expectedValue)
    })
})
