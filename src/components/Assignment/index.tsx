import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";

interface AssignmentProps {
    assignment: {
        id: number;
        title: string;
        completed: boolean;
        deadline?: Date;
    };
    onToggleCompletion: (id: number) => void;
    onDeleteAssignment: (id: number) => void;
}

export function Assignment({
                               assignment,
                               onToggleCompletion,
                               onDeleteAssignment,
                           }: AssignmentProps) {
    const getDeadlineText = (deadline?: Date): string => {
        if (!deadline) return "";

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date
        const deadlineDate = new Date(deadline);
        deadlineDate.setHours(0, 0, 0, 0); // Normalize deadline date

        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) return "Due: Now";
        if (daysDiff === 1) return "Tomorrow";
        if (daysDiff > 1) return `${daysDiff} days left`;
        return "Due: Now"; // If deadline has passed
    };

    const deadlineText = getDeadlineText(assignment.deadline);
    const isDeadlineClose = deadlineText === "Tomorrow" || deadlineText === "Due: Now";

    return (
        <div className={styles.assignment}>
            <button
                className={styles.checkContainer}
                onClick={() => onToggleCompletion(assignment.id)}
            >
                {assignment.completed ? (
                    <BsCheckCircleFill size={20} color="#5e60ce" /> // Purple circle with white checkmark
                ) : (
                    <div className={styles.circle} /> // Blue outlined circle
                )}
            </button>

            <p className={assignment.completed ? styles.textCompleted : ""}>
                {assignment.title}
            </p>

            {deadlineText && (
                <div
                    className={`${styles.deadlineBubble} ${
                        isDeadlineClose ? styles.deadlineClose : ""
                    }`}
                >
                    {deadlineText}
                </div>
            )}

            <button
                className={styles.deleteButton}
                onClick={() => onDeleteAssignment(assignment.id)}
            >
                <TbTrash size={20} />
            </button>
        </div>
    );
}