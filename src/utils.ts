export const toDate = (dateInput: string) => {
    const date = new Date(dateInput);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
