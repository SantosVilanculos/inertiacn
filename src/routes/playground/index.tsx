import { ThemeSwitcherDropdown } from '@/components/elements/theme-switcher-dropdown';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { createFileRoute } from '@tanstack/react-router';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github, tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const value = `
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline'
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
`;

export const Route = createFileRoute('/playground/')({
    component: () => {
        return (
            <div className="flex min-h-dvh flex-col gap-y-24 px-4 py-6">
                <div className=""></div>

                <div className="flex-1">
                    <div className="mx-auto w-full max-w-3xl">
                        <div className="space-y-4 space-y-reverse divide-y">
                            {Array.from({ length: 4 }, (_, index) => (
                                <Component key={index} value={value} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="shrink-0">
                    <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-x-2">
                        <div className="">Lorem ipsum dolor sit.</div>
                        <ThemeSwitcherDropdown />
                    </div>
                </div>
            </div>
        );
    }
});

function Button({ value }: { value: string }) {
    const [_, set_] = React.useState(false);

    return (
        <button
            className="group-hover:bg-muted/50 border-border rounded-bl-xs absolute right-0 top-0 z-10 grid size-8 place-content-center border-b border-l"
            disabled={_}
            onClick={async () => {
                await navigator.clipboard.writeText(value);
                set_(true);
                setTimeout(() => set_(false), 750);
            }}
        >
            {_ ? <CheckIcon className="text-muted-foreground size-4" /> : <CopyIcon className="text-muted-foreground size-4" />}
        </button>
    );
}

function Component({ language = 'typescript', value }: { language?: string; value: string }) {
    const { resolvedTheme } = useTheme();

    return (
        <div className="grid gap-y-2">
            <pre className="flex-1 whitespace-pre-wrap break-all font-mono text-sm font-medium">pnpm dlx shadcn add button</pre>

            <ScrollArea type="hover" className="border-border rounded-xs group h-96 overflow-auto border">
                <SyntaxHighlighter
                    className="isolate m-0 rounded-none p-0 font-mono"
                    language={language}
                    style={resolvedTheme === 'dark' ? tomorrowNight : github}
                    children={[value, 'Lorem']}
                />

                <Button value={value} />

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
