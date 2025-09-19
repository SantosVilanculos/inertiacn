import { Dump } from '@/components/dump';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const value =
    "'use client';\n\nimport { type FormComponentSlotProps } from '@inertiajs/core';\nimport { Form as Component } from '@inertiajs/react';\nimport * as React from 'react';\nimport { z } from 'zod';\n\nconst context = React.createContext<FormComponentSlotProps | null>(null);\n\nfunction useContext() {\n    const value = React.useContext(context);\n    if (value === null) throw new Error();\n    return value;\n}\n\nfunction Provider({ value, children }: React.ProviderProps<FormComponentSlotProps>) {\n    return <context.Provider value={value}>{children}</context.Provider>;\n}\n\nconst Root = React.forwardRef<\n    FormComponentSlotProps,\n    Omit<React.ComponentPropsWithoutRef<typeof Component>, 'onBefore'> & { schema?: z.ZodObject<any> }\n>(({ schema, children, ...props }, ref) => {\n    const form = React.useRef<FormComponentSlotProps>(null);\n\n    React.useImperativeHandle(ref, () => form.current as FormComponentSlotProps, []);\n\n    return (\n        <Component\n            ref={form}\n            onBefore={({ data }) => {\n                if (schema === undefined) return true;\n\n                const { success, error } = schema.safeParse(data);\n\n                if (success) return true;\n\n                const { fieldErrors } = z.flattenError(error);\n                (Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>).forEach(value => {\n                    const error = fieldErrors[value]?.shift();\n                    if (error) form.current?.setError(value, error);\n                });\n\n                return false;\n            }}\n            {...props}\n        >\n            {value => <Provider value={value}>{typeof children === 'function' ? children(value) : children}</Provider>}\n        </Component>\n    );\n});\n\nfunction Field<T extends string = string>({\n    name,\n    children\n}: {\n    name: T;\n    children:\n        | React.ReactNode\n        | (({\n              name,\n              error,\n              setError,\n              clearError,\n              reset,\n              resetAndClearError\n          }: {\n              name: T;\n              error: string | undefined;\n              setError: (error: string) => void;\n              clearError: () => void;\n              reset: () => void;\n              resetAndClearError: () => void;\n          }) => React.ReactNode);\n}): React.ReactNode {\n    const form = useContext();\n\n    const error = React.useMemo(() => form.errors[name], [form.errors, name]);\n    const setError = React.useCallback((error: string) => form.setError(name, error), [form, name]);\n    const clearError = React.useCallback(() => form.clearErrors(name), [form, name]);\n\n    const reset = React.useCallback(() => form.reset(name), [form, name]);\n    const resetAndClearError = React.useCallback(() => form.resetAndClearErrors(name), [form, name]);\n\n    return typeof children === 'function' ? children({ name, error, setError, clearError, reset, resetAndClearError }) : children;\n}\n\nfunction Consumer({ children }: { children: React.ReactNode | ((form: FormComponentSlotProps) => React.ReactNode) }): React.ReactNode {\n    const form = useContext();\n    return typeof children === 'function' ? children(form) : children;\n}\n\nexport const Form = { Root, Field, Consumer, useContext };\n";

function Component1() {
    return (
        <div className="grid gap-y-6">
            <div className="">
                <h1>Form</h1>
            </div>

            <div className="">
                <Input
                    defaultValue={`pnpm dlx shadcn@latest add ${import.meta.env.DEV ? window.location.origin : import.meta.env.NEXT_PUBLIC_BASE_URL}/r/form.json`}
                    readOnly
                />
            </div>

            <div className="">@/components/form.tsx</div>

            <ScrollArea className="min-h border-border aspect-square overflow-auto rounded-md border">
                <Dump value={value} />

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}

export { Component1 };
