import TextField from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import React from "react";

interface FormInputTextProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    control: Control<TFieldValues, any>;
    label: string;
    rules?: Omit<RegisterOptions<TFieldValues, FieldPath<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    disabled?: boolean;
    size?: 'small' | 'medium';
    error?: string | undefined;
    isArray?: boolean;
}


function FormInputText<TFieldValues extends FieldValues>(
    { name, control, label, rules = {}, disabled = false, size = 'medium', error = undefined, isArray = false }: FormInputTextProps<TFieldValues>) {
    const transform = {
        input: (value: string | string[]) => Array.isArray(value) ? value.join(', ') : value,
        output: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => e.target.value.split(/\s*,\s*/)
    };
    return (
        (
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    isArray ?
                        <TextField label={label} disabled={disabled} size={size} error={!!error}
                            helperText={error || ''}
                            onChange={(e) => field.onChange(transform.output(e))}
                            value={transform.input(field.value)} />
                        :
                        <TextField label={label} disabled={disabled} size={size} error={!!error}
                            helperText={error || ''}
                            {...field} />
                }
                rules={rules}
            />
        )
    )
}

export default FormInputText