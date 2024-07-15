function validateParams(params: any, schema: Record<string, any>) {
        const errors: string[] = [];

        Object.keys(schema).forEach(inputName => {
            const id = parseInt(params[inputName] as string);
            if (params[inputName] !== undefined) {
                if (isNaN(id)) {
                    errors.push(`${inputName} needs to be a ${schema[inputName as keyof typeof schema].type}.`);
                }
                if(params[inputName].length < schema[inputName as keyof typeof schema].minLength) {
                    errors.push(`${inputName} must be at least ${schema[inputName as keyof typeof schema].minLength} characters long.`);
                }
                if(params[inputName] < schema[inputName as keyof typeof schema].minValue) {
                    errors.push(`${inputName} must be at least ${schema[inputName as keyof typeof schema].minValue}.`);
                }
            }
            else {
                if(schema[inputName as keyof typeof schema].required === true) {
                    errors.push(`${inputName} is required in the params.`);
                }
            }
        });

        return errors;
}

export default validateParams;