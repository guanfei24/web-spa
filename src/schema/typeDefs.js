import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Menu {
    id: ID!
    title: String!
    type: Int!
    parent_id: Int
    route: String
    children: [Menu]
  }

  type Service {
    id: ID!
    category_id: Int!
    title: String!
    duration: Int
    price: Float
    slug: String
    image_url: String
    sort_order: Int
    is_active: Boolean
    description: String
  }

  type ServiceCategory {
    id: ID!
    name: String!
    sort_order: Int
    services: [Service]
  }

  type Review {
    id: ID!
    name: String!
    rating: Int!
    comment: String
    created_at: String
    is_visible: Boolean
    employee_id: Int
    employee_name: String
  }

  type Query {
    users: [User]
    frontendMenus: [Menu]
    adminMenus: [Menu]
    services: [Service]
    serviceCategories: [ServiceCategory]
    reviews: [Review]
    currentUser: User
  }

  input RegisterInput {
  name: String!
  email: String!
  password: String!
  roleId: Int! 
}
type Role {
  id: ID!
  name: String!
  description: String
}

type Query {
  roles: [Role!]!
}
  
type Mutation {
  login(email: String!, password: String!): User!
  register(input: RegisterInput!): User!
}
`;