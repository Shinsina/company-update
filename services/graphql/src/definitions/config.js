const { gql } = require('apollo-server');

module.exports = gql`

  extend type Query {
    companyUpdateConfig: CompanyUpdateConfiguration!
  }

  type CompanyUpdateConfiguration {
    logoUrl: String
    contactUrl: String
    contactText: String
    leadershipEnabled: Boolean!
    leadershipCompanyLabel: String
    leadershipSectionAlias: String!
    leadershipSectionMax: Int!
  }

`;
