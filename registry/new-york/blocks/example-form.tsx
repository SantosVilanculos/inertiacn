'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@/registry/new-york/ui/form';
import { Link } from '@inertiajs/react';
import { LoaderCircleIcon } from 'lucide-react';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2).max(255),
    email: z.email().max(255),
    password: z.string().min(8).max(100)
});

function ExampleForm() {
    return (
        <div className="flex flex-1 items-center">
            <div className="mx-auto w-full max-w-xs">
                <div className="grid gap-y-8">
                    <div className="grid place-content-center">
                        <Link href="#">
                            <svg className="size-8 fill-black dark:fill-white" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <rect fill="currentColor" width={512} height={512} />
                            </svg>
                        </Link>
                    </div>

                    <Form.Root
                        noValidate
                        schema={schema}
                        action="#"
                        showProgress={false}
                        options={{ preserveScroll: true }}
                        disableWhileProcessing
                        resetOnSuccess
                    >
                        <div className="grid gap-y-6">
                            <Form.Field name="name">
                                {({ name, error }) => (
                                    <div className="grid gap-y-2">
                                        <Label htmlFor={name}>Name</Label>
                                        <Input type="email" id={name} name={name} required autoComplete="name" autoFocus />
                                        {error && (
                                            <p className="text-sm text-destructive" role="alert">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </Form.Field>

                            <Form.Field name="email">
                                {({ name, error }) => (
                                    <div className="grid gap-y-2">
                                        <Label htmlFor={name}>Email</Label>
                                        <Input type="email" id={name} name={name} required autoComplete="email" />
                                        {error && (
                                            <p className="text-sm text-destructive" role="alert">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </Form.Field>

                            <Form.Field name="password">
                                {({ name, error }) => (
                                    <div className="grid gap-y-2">
                                        <Label htmlFor={name}>Password</Label>
                                        <Input type="password" id={name} name={name} required autoComplete="new-password" />
                                        {error && (
                                            <p className="text-sm text-destructive" role="alert">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </Form.Field>

                            <Form.Consumer>
                                {({ processing, reset }) => (
                                    <>
                                        <Button type="submit" disabled={processing}>
                                            {processing ? <LoaderCircleIcon className="size-4 animate-spin" /> : <span>Submit</span>}
                                        </Button>

                                        <Button
                                            variant="secondary"
                                            type="reset"
                                            disabled={processing}
                                            onClick={event => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                reset();
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </>
                                )}
                            </Form.Consumer>
                        </div>
                    </Form.Root>
                </div>
            </div>
        </div>
    );
}

export { ExampleForm };

// export default () => {
//     return (
//         <div className="flex min-h-dvh flex-col px-4 py-6">
//             <div className="shrink-0"></div>

//             <div className="shrink-0"></div>
//         </div>
//     );
// };
