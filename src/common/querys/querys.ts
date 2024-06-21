export const query = `
        SELECT id, "user", "password", email
        FROM public."user"
        WHERE id=1;
`;