import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./datePicker.module.css";

interface DatePickerProps {
    selectedDate?: Date;
    onSelect: (date?: Date) => void;
    onClose: () => void;
}

export function DatePicker({ selectedDate, onSelect, onClose }: DatePickerProps) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <AiFillCloseCircle
                    className={styles.closeIcon}
                    size={24}
                    onClick={onClose}
                />
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                        onSelect(date);
                        onClose(); // Close the modal after selecting a date
                    }}
                />
            </div>
        </div>
    );
}