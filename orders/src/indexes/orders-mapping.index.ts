export const ordersMappingIndex = {
  properties: {
    id: { type: 'text' },
    date: { type: 'date_time' },
    customer: {
      type: 'nested',
      properties: {
        id: { type: 'text' },
        name: { type: 'text' },
      },
    },
    items: {
      type: 'nested',
      properties: {
        product: {
          type: 'nested',
          properties: {
            id: { type: 'text' },
            name: { type: 'text' },
            price: { type: 'float' },
          },
        },
        quantity: { type: 'integer' },
      },
    },
  },
};
