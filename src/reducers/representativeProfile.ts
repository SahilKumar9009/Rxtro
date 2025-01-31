import {REDUCER} from '../constants';

export interface RepresentativeProfile {
  result: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    repStatus: number;
    userStatus: number;
    mobilePhone: string;
    portraitUrl: string;
    jobTitle: string;
    representativeId: string;
    company: {
      accountStatus: string;
      parentCompanyId: number;
      companyId: string;
      name: string;
      isPremium: 'None' | 'Basic' | 'Collaboration' | 'Advance' | 'Enterprise';
      logoUrl: string;
      parentCompanyName: string;
      products: [
        {
          productId: string;
          name: string;
          url: string;
        },
        {
          productId: string;
          name: string;
          url: string;
        },
      ];
    };
    userId: string;
  };
  'internal-code': number;
}

const initialState: {representativeProfile: RepresentativeProfile} = {
  representativeProfile: {
    result: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      repStatus: 0,
      userStatus: 0,
      mobilePhone: '',
      portraitUrl: '',
      jobTitle: '',
      representativeId: '',
      company: {
        accountStatus: '',
        parentCompanyId: 0,
        companyId: '',
        name: '',
        isPremium: 'None',
        logoUrl: '',
        parentCompanyName: '',
        products: [
          {
            productId: '',
            name: '',
            url: '',
          },
          {
            productId: '',
            name: '',
            url: '',
          },
        ],
      },
      userId: '',
    },
    'internal-code': 0,
  },
};

export default function representativeProfileReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case REDUCER.GET_REPRESENTATIVE_PROFILE_SUCCESS:
      return {
        ...state,
        representativeProfile: action.payload,
      };
    case REDUCER.GET_REPRESENTATIVE_PROFILE_FAILED:
      return {
        ...state,
        representativeProfile: {
          result: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            repStatus: 0,
            userStatus: 0,
            mobilePhone: '',
            portraitUrl: '',
            jobTitle: '',
            representativeId: '',
            company: {
              accountStatus: '',
              parentCompanyId: 0,
              companyId: '',
              name: '',
              isPremium: 'None',
              logoUrl: '',
              parentCompanyName: '',
              products: [
                {
                  productId: '',
                  name: '',
                  url: '',
                },
                {
                  productId: '',
                  name: '',
                  url: '',
                },
              ],
            },
            userId: '',
          },
          'internal-code': 0,
        },
      };
    default:
      return state;
  }
}
