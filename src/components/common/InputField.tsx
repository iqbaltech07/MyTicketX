'use client';

import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@heroui/react';

type InputFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    type: 'text' | 'email' | 'password';
} & React.ComponentProps<typeof Input>;

const InputField = <T extends FieldValues>({
    control,
    name,
    type,
    ...props
}: InputFieldProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Input
                    {...field}
                    {...props}
                    type={type}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    classNames={{
                        inputWrapper: [
                            'block w-full rounded-md border-0 py-2 px-3 text-white shadow-sm !placeholder:text-zinc-900 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 transition !caret-zinc-900',
                        ],
                    }}
                />
            )}
        />
    );
}

export default InputField;