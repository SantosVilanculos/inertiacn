'use client';

import { useTheme } from 'next-themes';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github, tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function Dump({ value }: { value: string }) {
    const { resolvedTheme } = useTheme();

    return (
        <SyntaxHighlighter className="font-mono" language="typescript" style={resolvedTheme === 'dark' ? tomorrowNight : github} children={value} />
    );
}
