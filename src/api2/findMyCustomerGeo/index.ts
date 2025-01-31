import {get} from '..';

export const findMyCustomerGeo = async userId => {
  try {
    const response = await get({
      path: `https://staging.rxtro.com/o/rep-territory/${userId}/find-my-territories-geo`,
      params: {},
      noLoader: true,
    });
    console.log('in the response: of the surbs', response);
    return response;
  } catch (error) {
    console.log('errors', error);
  }
};
