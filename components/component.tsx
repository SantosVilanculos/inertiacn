'use client';

import { Dump } from '@/components/dump';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

const value = `
import { type FormComponentSlotProps } from '@inertiajs/core';
import { Form as Component } from '@inertiajs/react';
import * as React from 'react';
import { z } from 'zod';

const context = React.createContext<FormComponentSlotProps | null>(null);

function useContext() {
    const value = React.useContext(context);
    if (value === null) throw new Error();
    return value;
}

function Provider({ value, children }: React.ProviderProps<FormComponentSlotProps>) {
    return <context.Provider value={value}>{children}</context.Provider>;
}

const Root = React.forwardRef<
    FormComponentSlotProps,
    Omit<React.ComponentPropsWithoutRef<typeof Component>, 'onBefore'> & { schema?: z.ZodObject<any> }
>(({ schema, children, ...props }, ref) => {
    const form = React.useRef<FormComponentSlotProps>(null);

    React.useImperativeHandle(ref, () => form.current as FormComponentSlotProps, []);

    return (
        <Component
            ref={form}
            onBefore={({ data }) => {
                if (schema === undefined) return true;

                const { success, error } = schema.safeParse(data);

                if (success) return true;

                const { fieldErrors } = z.flattenError(error);
                (Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>).forEach(value => {
                    const error = fieldErrors[value]?.shift();
                    if (error) form.current?.setError(value, error);
                });

                return false;
            }}
            {...props}
        >
            {value => <Provider value={value}>{typeof children === 'function' ? children(value) : children}</Provider>}
        </Component>
    );
});

function Field<T extends string = string>({
    name,
    children
}: {
    name: T;
    children:
        | React.ReactNode
        | (({
              name,
              error,
              setError,
              clearError,
              reset,
              resetAndClearError
          }: {
              name: T;
              error: string | undefined;
              setError: (error: string) => void;
              clearError: () => void;
              reset: () => void;
              resetAndClearError: () => void;
          }) => React.ReactNode);
}): React.ReactNode {
    const form = useContext();

    const error = React.useMemo(() => form.errors[name], [form.errors, name]);
    const setError = React.useCallback((error: string) => form.setError(name, error), [form, name]);
    const clearError = React.useCallback(() => form.clearErrors(name), [form, name]);

    const reset = React.useCallback(() => form.reset(name), [form, name]);
    const resetAndClearError = React.useCallback(() => form.resetAndClearErrors(name), [form, name]);

    return typeof children === 'function' ? children({ name, error, setError, clearError, reset, resetAndClearError }) : children;
}

function Consumer({ children }: { children: React.ReactNode | ((form: FormComponentSlotProps) => React.ReactNode) }): React.ReactNode {
    const form = useContext();
    return typeof children === 'function' ? children(form) : children;
}

export const Form = { Root, Field, Consumer, useContext };

`;

function Component() {
    return (
        <ScrollArea className="min-h aspect-square overflow-auto rounded-md border border-border">
            <Dump value={value} />

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

export { Component };
