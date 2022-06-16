import React, {useState} from 'react';

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return {
        value,
        setValue,
        error,
        setError,
        onChange: handleChange
    };
};
