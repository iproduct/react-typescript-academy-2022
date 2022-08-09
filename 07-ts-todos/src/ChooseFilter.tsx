import React, { ReactElement } from 'react'
import { FilterType, FilterChangeListener } from './TodoApp';
import { TodoStatus } from './todo.model';
import './ChooseFilter.css';



interface Props {
    filter: FilterType;
    onFilterChange: FilterChangeListener;
}

export default function ChooseFilter({filter, onFilterChange}: Props): ReactElement {
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange(event.target.value === '0' ? undefined: (parseInt(event.target.value) as TodoStatus));
    }
    return (
        <select value={filter} onChange={handleFilterChange} className="ChooseFilter">
            <option value='0'>ALL</option>
            <option value={TodoStatus.ACTIVE}>Active</option>
            <option value={TodoStatus.CANCELED}>Canceled</option>
            <option value={TodoStatus.COMPLETED}>Completed</option>
        </select>
    )
}
