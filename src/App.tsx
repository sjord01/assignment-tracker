import { useState } from "react";
import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";

export interface Assignment {
    id: number;
    title: string;
    completed: boolean;
    deadline?: Date; // Optional deadline field
}

function App() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const addAssignment = (title: string, deadline?: Date) => {
        const newAssignment: Assignment = {
            id: Date.now(), // Unique ID (using timestamp)
            title,
            completed: false,
            deadline,
        };
        setAssignments([...assignments, newAssignment]);
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

    return (
        <>
            <Header onAddAssignment={addAssignment} />
            <Assignments
                assignments={assignments}
                onToggleCompletion={toggleCompletion}
                onDeleteAssignment={deleteAssignment}
            />
        </>
    );
}

export default App;