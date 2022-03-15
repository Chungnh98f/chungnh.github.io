export enum SearchType {
    Org = "org",
    User = "user",
}

export enum SortEnum {
    Created = "created",
    Updated = "updated",
    Pushed = "pushed",
    Name = "full_name",
}

export enum DirectionEnum {
    Desc = "desc",
    Asc = "asc",
}

export const InputType = [
    { label: "Organization", value: "org" },
    { label: "Username", value: "user" },
];

export const SortTypes = [
    { label: "Created", value: "created" },
    { label: "Updated", value: "updated" },
    { label: "Pushed", value: "pushed" },
    { label: "Name", value: "full_name" },
];

export const DirectionTypes = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
];
