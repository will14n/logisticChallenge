const orderSchema = {
    type: {
        type: 'string',
        required: false
    },
    weight: {
        type: 'number',
        required: false
    },
    destination: {
        type: 'object',
        required: false
    },
    items: {
        type: 'object',
        required: true
    },
};


export default orderSchema;