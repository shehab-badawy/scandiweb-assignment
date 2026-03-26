import { gql } from '@apollo/client';


export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;



export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProducts($category: String!) {
    products(category: $category) {
      id
      name
      brand
      inStock        # Matches resolve in ProductType.php
      description
      gallery        # Returns array of strings
      attributes {   # Uses AttributeType.php
        id
        name
        type
        items {      # Uses AttributeItemType.php
          id
          displayValue
          value
        }
      }
      prices {       # Matches PriceType.php
        amount
        label
        symbol
      }
    }
  }
`;


export const GET_PRODUCT_DETAILS = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        label
        symbol
      }
    }
  }
`;