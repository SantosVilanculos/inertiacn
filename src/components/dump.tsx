import { useTheme } from 'next-themes';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github, tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function Dump({ value, language = 'typescript' }: { value: string; language?: string }) {
    const { resolvedTheme } = useTheme();

    return <SyntaxHighlighter className="font-mono" language={language} style={resolvedTheme === 'dark' ? tomorrowNight : github} children={value} />;
}
