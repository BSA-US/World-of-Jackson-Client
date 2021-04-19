export function tsMatch(str: string, matcher: RegExp): string {
    let matched = str.match(matcher)
    if (matched !== null) {
        return matched.reduce( (a, b) => a + b, "");
    } else {
        return "";
    }
}