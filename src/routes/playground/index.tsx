import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/playground/')({
    component: () => {
        return <div className="">Hello, World!</div>;
    }
});
