import React from "react";
import { FilterChangeListener, FilterType } from "./TodoApp";



type TodoFilterProps = {
    filter: FilterType;
    onFilterChange: FilterChangeListener;
}
export const TodoFilter = ({ filter, onFilterChange }: TodoFilterProps) => {
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange(event.target.value === '0' ? undefined : parseInt(event.target.value))
    }
    return (
        <select value={filter} onChange={handleFilterChange} className='TodoFilter'>
            <option value='0'>All</option>
            <option value='1'>Active</option>
            <option value='2'>Completed</option>
            <option value='3'>Canceled</option>
        </select>
    );
};

export default TodoFilter;