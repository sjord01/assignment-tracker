import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useAssignments } from "./helpers/useAssignment";

function App() {
    const { assignments, addAssignment, toggleCompletion, deleteAssignment } =
        useAssignments();

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