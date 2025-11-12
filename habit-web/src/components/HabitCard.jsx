

function HabitCard({habit, onComplete, onDelete, completing, deleting,}) {

    const logs = Array.isArray(habit?.logs) ? habit.logs : [];
    const lastLog = logs.length ? logs[logs.length - 1] : "Never";
    const disabled = completing || deleting;


    return (

        <article className="card">
            <div className="card-main">

                <div className="stack">
                    <h3 className="card-title">{habit.name}</h3>
                    <div className="meta">
                        <span className="meta-item">Streak: <strong>{habit.streak}</strong> day(s)</span>
                        <span className="dot">•</span>
                        <span className="meta-item">Last completed: {lastLog}</span>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn" onClick={onComplete} disabled={disabled}>
                        {completing ? "Saving…" : "Complete today"}
                    </button>
                    <button className="btn btn-ghost-danger" onClick={onDelete} disabled={disabled}>
                        {deleting ? "Deleting…" : "Delete"}
                    </button>
                </div>

            </div>
        </article>

        
    );
}

export default HabitCard