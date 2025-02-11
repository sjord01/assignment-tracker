import { useState } from "react";

export interface Assignment {
    id: number;
    title: string;
    completed: boolean;
    deadline?: Date;
}

export function useAssignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [idCounter, setIdCounter] = useState(1);

    const addAssignment = (title: string, deadline?: Date) => {
        const newAssignment: Assignment = {
            id: idCounter,
            title,
            completed: false,
            deadline,
        };
        setAssignments((prev) => [...prev, newAssignment]);
        setIdCounter((prev) => prev + 1);
    };

    const toggleCompletion = (id: number) => {
        setAssignments((prevAssignments) =>
            prevAssignments.map((assignment) =>
                assignment.id === id
                    ? { ...assignment, completed: !assignment.completed }
                    : assignment
            )
        );
    };

    const deleteAssignment = (id: number) => {
        setAssignments((prevAssignments) =>
            prevAssignments.filter((assignment) => assignment.id !== id)
        );
    };

    return {
        assignments,
        addAssignment,
        toggleCompletion,
        deleteAssignment,
    };
}