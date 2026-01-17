import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/select";

/* SCROLLABLE SELECT WITH MANY OPTIONS */
export const Example6 = () => {
    const timezones = [
        {
            label: "North America",
            items: [
                { value: "est", label: "Eastern Standard Time (EST)" },
                { value: "cst", label: "Central Standard Time (CST)" },
                { value: "mst", label: "Mountain Standard Time (MST)" },
                { value: "pst", label: "Pacific Standard Time (PST)" },
                { value: "akst", label: "Alaska Standard Time (AKST)" },
                { value: "hst", label: "Hawaii Standard Time (HST)" },
            ],
        },
        {
            label: "Europe",
            items: [
                { value: "gmt", label: "Greenwich Mean Time (GMT)" },
                { value: "cet", label: "Central European Time (CET)" },
                { value: "eet", label: "Eastern European Time (EET)" },
                { value: "west", label: "Western European Summer Time (WEST)" },
            ],
        },
        {
            label: "Asia",
            items: [
                { value: "msk", label: "Moscow Time (MSK)" },
                { value: "ist", label: "India Standard Time (IST)" },
                { value: "cst_asia", label: "China Standard Time (CST)" },
                { value: "jst", label: "Japan Standard Time (JST)" },
                { value: "kst", label: "Korea Standard Time (KST)" },
            ],
        },
        {
            label: "Australia & Pacific",
            items: [
                {
                    value: "awst",
                    label: "Australian Western Standard Time (AWST)",
                },
                {
                    value: "acst",
                    label: "Australian Central Standard Time (ACST)",
                },
                {
                    value: "aest",
                    label: "Australian Eastern Standard Time (AEST)",
                },
                { value: "nzst", label: "New Zealand Standard Time (NZST)" },
            ],
        },
    ];

    return (
        <Select placeholder="Select a timezone">
            <SelectTrigger className="w-[280px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {timezones.map((group) => (
                    <SelectGroup key={group.label}>
                        <SelectLabel>{group.label}</SelectLabel>
                        {group.items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    );
};
