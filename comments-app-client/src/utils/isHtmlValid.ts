export const isHtmlValid = (html: string): boolean => {
    const tagPattern = /<\/?([a-zA-Z]+)(?:\s[^>]*)?>/g;
    const stack: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = tagPattern.exec(html)) !== null) {
        const [fullTag, tagName] = match;
        if (fullTag.startsWith('</')) {
            if (stack.length === 0 || stack.pop() !== tagName) {
                return false; // Unmatched closing tag
            }
        } else if (!fullTag.endsWith('/>')) {
            stack.push(tagName);
        }
    }

    return stack.length === 0;
};