function validateRequests(query: any, schema: Record<string, any>) {
        const errors: string[] = [];

        Object.keys(schema).forEach(inputName => {
            if (query[inputName] !== undefined) {
                if (schema[inputName as keyof typeof schema].type !== typeof query[inputName]) {
                    errors.push(`${inputName} needs to be a ${schema[inputName as keyof typeof schema].type}.`);
                }
            }
            else {
                if(schema[inputName as keyof typeof schema].required === true) {
                    errors.push(`${inputName} is required in the query.`);
                }
            }
        });

        return errors;
}

export default validateRequests;