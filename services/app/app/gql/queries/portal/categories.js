import gql from 'graphql-tag';
export default gql`
query ContentUpdateLeadershipData($sites: WebsiteSitesQueryInput!, $leaders: WebsiteSiteSectionsInput!, $children: WebsiteSectionChildrenInput!) {
  websiteSites(input: $sites) {
    edges {
      node {
        id
        name
        sections(input: $leaders) {
          edges {
            node {
              id
              name
              alias
              children(input: $children) {
                edges {
                  node {
                    id
                    name
                    alias
                    children(input: $children) {
                      totalCount
                      edges {
                        node {
                          id
                          name
                          alias
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
