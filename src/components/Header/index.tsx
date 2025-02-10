import React, { useState } from "react";
import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { BsCalendar2DateFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

interface HeaderProps {
    onAddAssignment: (title: string, deadline?: Date) => void;
}

export function Header({ onAddAssignment }: HeaderProps) {
    const [assignmentName, setAssignmentName] = useState<string>("");
    const [selectedDeadline, setSelectedDeadline] = useState<Date | undefined>();
    const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAssignmentName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (assignmentName.trim()) {
            onAddAssignment(assignmentName.trim(), selectedDeadline);
            setAssignmentName("");
            setSelectedDeadline(undefined);
        }
    };

    const isButtonDisabled = !assignmentName.trim();

    return (
        <header className={styles.header}>
            <h1>{uppercase("bcit")} Assignment Tracker</h1>
            <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
                <div className={styles.inputLine}>
                <div className={styles.inputContainer}>
                    <input
                        placeholder="Add a new assignment"
                        type="text"
                        value={assignmentName}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className={styles.calendarIcon}
                        onClick={() => setIsDatePickerVisible(true)}
                    >
                        <BsCalendar2DateFill size={20} />
                    </button>
                </div>

                {isDatePickerVisible && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <AiFillCloseCircle
                                className={styles.closeIcon}
                                size={24}
                                onClick={() => setIsDatePickerVisible(false)}
                            />
                            <DayPicker
                                mode="single"
                                selected={selectedDeadline}
                                onSelect={(date) => {
                                    setSelectedDeadline(date);
                                    setIsDatePickerVisible(false); // Close the modal after selecting a date
                                }}
                            />
                        </div>
                    </div>
                )}

                <button
                    disabled={isButtonDisabled}
                    className={isButtonDisabled ? styles.disabledButton : styles.createButton}
                >
                    Create <AiOutlinePlusCircle size={20} />
                </button>
                </div>

                <aside className={styles.selectedDate}>
                    {selectedDeadline && (
                        <>
                            <span>{selectedDeadline.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}</span> selected
                        </>
                    )}
                </aside>
            </form>

        </header>
    );
}