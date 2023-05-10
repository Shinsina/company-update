const { gql } = require('apollo-server');

module.exports = gql`

  extend type Mutation {
    companyUpdateDirectorySectionsSubmit(input: CompanyUpdateDirectorySectionsMutationInput): CompanyUpdateSubmission!
  }

  input CompanyUpdateDirectorySectionsMutationInput {
    name: String!
    email: String!
    hash: String!
    type: CompanyUpdateSubmissionType = directorysections
    payload: CompanyUpdateLeadershipPayloadInput!
  }

  input CompanyUpdateLeadershipPayloadInput {
    sections: [Int!]!
  }

`;
