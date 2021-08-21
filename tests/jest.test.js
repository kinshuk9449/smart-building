const axios = require('axios');
DEVICE_URL="http://localhost:5000/api"
USER_URL="http://localhost:5001/api"

test('test device array', () => {
    expect.assertions(1);
    return axios.get(`${DEVICE_URL}/devices`)
      .then(resp => resp.data)
      .then(resp => {
        expect(resp[0].device).toEqual('Light');
      });
    });

test('test user array', () => {
        expect.assertions(1);
        return axios.get(`${USER_URL}/users`)
          .then(resp => resp.data)
          .then(resp => {
            expect(resp[0].email).toEqual('jainkinshuk112@gmail.com');
          });
        });