import {
	createAsyncThunk,
	createSlice,
	nanoid,
	PayloadAction,
} from "@reduxjs/toolkit";

export interface Habit {
	id: string;
	name: string;
	frequency: "daily" | "weekly";
	completedDates: string[];
	createsAt: string;
}

interface HabitState {
	habits: Habit[];
	isLoading: boolean;
	error: string | null;
}

const initialState: HabitState = {
	habits: [],
	isLoading: false,
	error: null,
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const mockHabits: Habit[] = [
		{
			id: "1",
			name: "Study",
			frequency: "daily",
			completedDates: [],
			createsAt: new Date().toISOString(),
		},
		{
			id: "2",
			name: "Code",
			frequency: "daily",
			completedDates: [],
			createsAt: new Date().toISOString(),
		},
	];
	return mockHabits;
});

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
	extraReducers: (builder) => {
		builder
			.addCase(fetchHabits.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchHabits.fulfilled, (state, action) => {
				(state.isLoading = false), (state.habits = action.payload);
			})
			.addCase(fetchHabits.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || "Failed to fetch habits";
			});
	},
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
