import { Dump } from '@/components/dump';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const value1 = `
<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'route' => [
                'name' => $request->route()->getName(),
                'params' => $request->route()->originalParameters() ?: null,
                'query' => $request->query() ?: null
            ],
        ];
    }
}
`;
const value2 =
    "import { router, usePage } from '@inertiajs/react';\nimport * as React from 'react';\n\ntype PageProps<TParams extends Record<string, unknown>, TQuery extends Record<string, unknown>> = {\n    route: {\n        name: string | null;\n        params: TParams | null;\n        query: TQuery | null;\n    };\n};\n\nfunction useRoute<\n    TParams extends Record<string, unknown> = Record<string, unknown>,\n    TQuery extends Record<string, unknown> = Record<string, unknown>\n>() {\n    const { props } = usePage<PageProps<TParams, TQuery>>();\n\n    const named = React.useCallback(\n        (name: string) => {\n            if (props.route.name === null) return false;\n\n            if (props.route.name === name) {\n                return true;\n            }\n\n            if (name.endsWith('*')) {\n                return props.route.name.startsWith(name.slice(0, -1));\n            }\n\n            return false;\n        },\n        [props.route.name]\n    );\n\n    const params = React.useMemo(() => props.route.params || ({} as TParams), [props.route.params]);\n    const query = React.useMemo(() => props.route.query || ({} as TQuery), [props.route.query]);\n\n    const [hash, setHash] = React.useState<string | null>(window.location.hash || null);\n    const [path, setPath] = React.useState(window.location.pathname);\n    const [fullPath, setFullPath] = React.useState(window.location.href.replace(window.location.origin, ''));\n\n    React.useEffect(() => {\n        const listener = (event: HashChangeEvent) => {\n            const { hash, href, origin } = new URL(event.newURL);\n            setHash(hash || null);\n            setFullPath(href.replace(origin, ''));\n        };\n\n        window.addEventListener('hashchange', listener);\n\n        return () => {\n            window.removeEventListener('hashchange', listener);\n        };\n    }, []);\n\n    React.useEffect(() => {\n        return router.on('navigate', () => {\n            const { hash, pathname, href, origin } = window.location;\n            setHash(hash || null);\n            setPath(pathname);\n            setFullPath(href.replace(origin, ''));\n        });\n    }, []);\n\n    return {\n        name: props.route.name,\n        named,\n        params,\n        query,\n        hash,\n        path,\n        fullPath\n    };\n}\n\nexport { useRoute };\n";

function Component2() {
    return (
        <div className="grid gap-y-6">
            <div className="">
                <h1>useRoute</h1>
            </div>

            <div className="">
                <Input
                    defaultValue={`pnpm dlx shadcn@latest add ${import.meta.env.DEV ? window.location.origin : import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL}/r/use-route.json`}
                    readOnly
                />
            </div>

            <div className="">@/hooks/use-route.tsx</div>

            <ScrollArea className="min-h border-border aspect-video overflow-auto rounded-md border">
                <Dump value={value2} />

                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="">app/Http/Middleware/HandleInertiaRequests.php</div>

            <ScrollArea className="min-h border-border aspect-video overflow-auto rounded-md border">
                <Dump value={value1} language="php" />

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}

export { Component2 };
