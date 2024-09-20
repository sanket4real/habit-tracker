import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
	id: string;
	name: string;
	frequency: "daily" | "weekly";
	completedDates: string[];
	createsAt: string;
}

interface HabitState {
	habits: Habit[];
}

const initialState: HabitState = {
	habits: [],
};

const habitSlice = createSlice({
	name: "habits",
	initialState,
	reducers: {
		addHabit: (
			state,
			action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
		) => {
			const newHabit: Habit = {
				id: nanoid(),
				name: action.payload.name,
				frequency: action.payload.frequency,
				completedDates: [],
				createsAt: new Date().toISOString(),
			};

			state.habits.push(newHabit);
		},
		toggleHabit: (state, action: PayloadAction<{ id: string; date: string }>) => {
			const habit = state.habits.find((h) => h.id === action.payload.id);

			if (habit) {
				const index = habit.completedDates.indexOf(action.payload.date);

				if (index > -1) {
					habit.completedDates.splice(index, 1);
				} else {
					habit.completedDates.push(action.payload.date);
				}
			}
		},
		removeHabit: (state, action: PayloadAction<{ id: string }>) => {
			const newHabitArr = state.habits.filter(
				(habit) => habit.id !== action.payload.id
			);
			state.habits = newHabitArr;
		},
	},
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
