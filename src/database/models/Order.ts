export interface Order {
    id: number;
    type: string;
    weight: number;
    receiverAddress: string;
    receiverName: string;
    receiverPhone: string;
    integrationId: string;
}