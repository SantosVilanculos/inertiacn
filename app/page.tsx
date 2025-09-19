import { Component } from '@/components/component';
import { OpenInV0Button } from '@/components/open-in-v0-button';
import { Input } from '@/components/ui/input';

export default function Home() {
    return (
        <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
                <p className="text-muted-foreground">A custom registry for distributing code using shadcn.</p>
            </header>

            <main className="flex flex-1 flex-col gap-8">
                <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
                    <div className="">
                        <h1>Form</h1>
                    </div>
                    <div className="flex items-center justify-between gap-x-2">
                        <Input value={`pnpm dlx shadcn@latest add ${process.env.NEXT_PUBLIC_BASE_URL}/r/form.json`} />
                        <OpenInV0Button name="form" className="w-fit" />
                    </div>
                    <Component />
                </div>
            </main>
        </div>
    );
}
