import {Colors} from '@src/config';
import * as React from 'react';
import {Control, Path, useController} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';

type Input<TFieldValues extends object> = {
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
    placeholder?: string;
    secureTextEntry?: boolean;
};

const Input = <TFieldValues extends object>({
    name,
    control,
    placeholder,
    secureTextEntry,
}: Input<TFieldValues>) => {
    const {field} = useController<TFieldValues>({
        name,
        control,
    });

    return (
        <TextInput
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.White,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        padding: 12,
        fontSize: 20,
        borderRadius: 5,
    },
});

export default Input;
