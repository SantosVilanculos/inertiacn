import { Component1 } from '@/components/component1';
import { Component2 } from '@/components/component2';
import { Separator } from '@/components/ui/separator';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: () => {
        return (
            <div className="min-h-dvh px-4 py-6">
                <div className="mx-auto w-full max-w-3xl">
                    <div className="space-y-24">
                        <Component1 />

                        <Separator />

                        <Component2 />
                    </div>
                </div>
            </div>
        );
    }
});
