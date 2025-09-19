import { Component } from '@/components/component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: () => {
        return (
            <div className="min-h-dvh px-4 py-6">
                <div className="mx-auto w-full max-w-3xl">
                    <div className="space-y-24 divide-y">
                        <Component />
                    </div>
                </div>
            </div>
        );
    }
});
