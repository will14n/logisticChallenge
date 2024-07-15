function validateBody(body: any, schema: Record<string, any>) {
        const errors: string[] = [];
        Object.keys(schema).forEach(inputName => {
            if (body[inputName] !== undefined) {
                if (typeof body[inputName] !== typeof Object) {
                    if (schema[inputName as keyof typeof schema].type !== typeof body[inputName]) {
                        errors.push(`${inputName} needs to be a ${schema[inputName as keyof typeof schema].type}.`);
                    }
                }
                if (schema[inputName as keyof typeof schema].minLength) {

                    if(body[inputName].length < schema[inputName as keyof typeof schema].minLength) {
                        errors.push(`${inputName} must be at least ${schema[inputName as keyof typeof schema].minLength} characters long.`);
                    }
                }
                if (schema[inputName as keyof typeof schema].maxLength) {
                    if(body[inputName].length > schema[inputName as keyof typeof schema].maxLength) {
                        errors.push(`${inputName} must be at most ${schema[inputName as keyof typeof schema].maxLength} characters long.`);
                    }
                }
            }
            else {
                if(schema[inputName as keyof typeof schema].required === true) {
                    errors.push(`${inputName} is required in the body.`);
                }
            }
        });
        return errors;
}

export default validateBody;