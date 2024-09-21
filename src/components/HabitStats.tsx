import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchHabits } from "../store/habitSlice";

function HabitStats() {
	const { habits, isLoading, error } = useSelector(
		(state: RootState) => state.habits
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchHabits());
	}, []);

	return <div>HabitStats</div>;
}

export default HabitStats;
