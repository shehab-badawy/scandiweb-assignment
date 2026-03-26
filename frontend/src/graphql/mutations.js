import { gql } from '@apollo/client';

export const PLACE_ORDER = gql`
  mutation PlaceOrder($total_amount: Float!, $currency_label: String!, $items: [OrderItemInput]!) {
    placeOrder(total_amount: $total_amount, currency_label: $currency_label, items: $items)
  }
`;