const querySchema = {
    page: {
        type: 'number',
        required: false
    },
    limit: {
        type: 'number',
        required: false
    },
    filter: {
        type: 'string',
        required: false
    },
};

export default querySchema;