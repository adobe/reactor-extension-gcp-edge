/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable camelcase */

const sendEvent = require('../sendDataToCloudPubSub');
const arc = {};

describe('Send Data to Cloud Pub/Sub module', () => {
  test('makes a fetch call to the provided url', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      credentials: {
        accessToken: 'ABC'
      }
    };

    const settings = {
      topic: 'projects/123/topics/ABC',
      data: {
        price: '200',
        quantity: '2'
      },
      attributes: {
        by: 'Launch'
      }
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendEvent({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://pubsub.googleapis.com/v1/projects/123/topics/ABC:publish',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ABC',
            'content-type': 'application/json'
          },
          body:
            '{' +
            '"messages":[{' +
            '"data":"eyJwcmljZSI6IjIwMCIsInF1YW50aXR5IjoiMiJ9",' +
            '"attributes":{"by":"Launch"}' +
            '}]' +
            '}'
        }
      );
    });
  });
});
