import { router, usePage } from '@inertiajs/react';
import * as React from 'react';

type PageProps<TParams extends Record<string, unknown>, TQuery extends Record<string, unknown>> = {
    route: {
        name: string | null;
        params: TParams | null;
        query: TQuery | null;
    };
};

function useRoute<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TQuery extends Record<string, unknown> = Record<string, unknown>
>() {
    const { props } = usePage<PageProps<TParams, TQuery>>();

    const named = React.useCallback(
        (name: string) => {
            if (props.route.name === null) return false;

            if (props.route.name === name) {
                return true;
            }

            if (name.endsWith('*')) {
                return props.route.name.startsWith(name.slice(0, -1));
            }

            return false;
        },
        [props.route.name]
    );

    const params = React.useMemo(() => props.route.params || ({} as TParams), [props.route.params]);
    const query = React.useMemo(() => props.route.query || ({} as TQuery), [props.route.query]);

    const [hash, setHash] = React.useState<string | null>(window.location.hash || null);
    const [path, setPath] = React.useState(window.location.pathname);
    const [fullPath, setFullPath] = React.useState(window.location.href.replace(window.location.origin, ''));

    React.useEffect(() => {
        const listener = (event: HashChangeEvent) => {
            const { hash, href, origin } = new URL(event.newURL);
            setHash(hash || null);
            setFullPath(href.replace(origin, ''));
        };

        window.addEventListener('hashchange', listener);

        return () => {
            window.removeEventListener('hashchange', listener);
        };
    }, []);

    React.useEffect(() => {
        return router.on('navigate', () => {
            const { hash, pathname, href, origin } = window.location;
            setHash(hash || null);
            setPath(pathname);
            setFullPath(href.replace(origin, ''));
        });
    }, []);

    return {
        name: props.route.name,
        named,
        params,
        query,
        hash,
        path,
        fullPath
    };
}

export { useRoute };
