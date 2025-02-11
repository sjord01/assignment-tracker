import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

interface Assignment {
    id: number;
    title: string;
    completed: boolean;
}

interface AssignmentsProps {
    assignments: Assignment[];
    onToggleCompletion: (id: number) => void;
    onDeleteAssignment: (id: number) => void;
}

export function Assignments({
                                assignments,
                                onToggleCompletion,
                                onDeleteAssignment,
                            }: AssignmentsProps) {

    const totalAssignments = assignments.length;
    const completedAssignments = assignments.filter(
        (assignment) => assignment.completed
    ).length;

    return (
        <section className={styles.assignments}>
            <header className={styles.header}>
                <div>
                    <p>Created Assignments</p>
                    <span>{totalAssignments}</span>
                </div>

                <div>
                    <p className={styles.textPurple}>Completed Assignments</p>
                    <span>
            {completedAssignments} of {totalAssignments}
          </span>
                </div>
            </header>

            <div className={styles.list}>
                {assignments.map((assignment) => (
                    <Assignment
                        key={assignment.id}
                        assignment={assignment}
                        onToggleCompletion={onToggleCompletion}
                        onDeleteAssignment={onDeleteAssignment}
                    />
                ))}
            </div>
        </section>
    );
}