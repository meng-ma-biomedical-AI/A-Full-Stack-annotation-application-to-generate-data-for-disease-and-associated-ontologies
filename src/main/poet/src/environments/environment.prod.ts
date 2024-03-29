import { HttpMethod } from "@auth0/auth0-angular";

const POET_BASE_URL = 'https://ctmaxo01ld.jax.org/api/v1';
const MONARCH_BASE_URL = 'https://api.monarchinitiative.org/api';
const PUBMED_BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
const HPO_BASE_URL = 'https://hpo.jax.org/api/';
import { domain, clientId, audience } from '../../auth.config.json';
export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    audience
  },
  httpInterceptor: {
    allowedList: [
      POET_BASE_URL + '/user/check',
      POET_BASE_URL + '/statistics/activity/',
      POET_BASE_URL + '/statistics/contributions/',
      {
        uri: POET_BASE_URL + '/annotation/treatments/*',
        httpMethod: HttpMethod.Post,
      },
      {
        uri: POET_BASE_URL + '/annotation/treatments/*',
        httpMethod: HttpMethod.Put,
      },
      {
        uri: POET_BASE_URL + '/annotation/treatments/*',
        httpMethod: HttpMethod.Delete,
      },
      {
        uri: POET_BASE_URL + '/entity/disease/',
        httpMethod: HttpMethod.Put,
      },
      {
        uri: POET_BASE_URL + '/entity/publication/',
        httpMethod: HttpMethod.Post,
      },
    ]
  },
  POET_BASE_URL: POET_BASE_URL,
  POET_API_CHECK_USER_URL: POET_BASE_URL + '/user/check',
  POET_API_SEARCH_URL: POET_BASE_URL + '/search',
  POET_API_MAXO_ANNOTATION: POET_BASE_URL + '/annotation/treatments/',
  POET_API_DISEASE_ENTITY_URL: POET_BASE_URL + '/entity/disease/',
  POET_API_PUBLICATION_ENTITY_URL: POET_BASE_URL + '/entity/publication/',
  POET_API_STATISTICS_ACTIVITY_URL: POET_BASE_URL + "/statistics/activity/",
  POET_API_STATISTICS_CONTRIBUTION_URL: POET_BASE_URL + "/statistics/contributions/",
  POET_API_STATISTICS_ANNOTATION_URL: POET_BASE_URL + "/statistics/annotation/",
  HPO_API_HPO_SEARCH_URL: HPO_BASE_URL + 'hpo/search',
  HPO_API_MAXO_SEARCH_URL: HPO_BASE_URL + 'maxo/search/',
  MONARCH_SEARCH_URL: MONARCH_BASE_URL + '/search/entity/autocomplete/',
  MONARCH_ENTITY_URL: MONARCH_BASE_URL + '/bioentity/',
  PUBMED_SUMMARY_URL: PUBMED_BASE_URL + 'esummary.fcgi',
  AUDIENCE_ROLE: "https://poet.jax.org/role"
};
