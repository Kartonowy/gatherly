export function getUserSleeveInfo():
{
    label: string,
    url: string
}
{
    return {
        label: prompt("label")!,
        url: prompt("url")!
    }
}
