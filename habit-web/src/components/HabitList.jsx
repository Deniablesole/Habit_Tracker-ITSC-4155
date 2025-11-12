import HabitCard from "./HabitCard";

function HabitList({habits, onComplete, onDelete, completingName, deletingName,}) {

    const items = Array.isArray(habits) ? habits : [];

    if (!items.length) {
        return(
            <div className="empty">
                <p>No habits yet. Add one above to get started.</p>
            </div>
        );
    }

    return (
        <div className="habit-list">
            {items.map((h) => (
                <HabitCard
                    key={h.name}
                    habit={h}
                    onComplete={() => onComplete(h.name)}
                    onDelete={() => onDelete(h.name)}
                    completing={completingName === h.name}
                    deleting={deletingName === h.name}
                />
            ))}
        </div>
    );
}
export default HabitList