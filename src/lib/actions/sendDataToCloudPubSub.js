/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable camelcase */

const isString = (value) =>
  typeof value === 'string' || value instanceof String;

const base64Encode = (value) => {
  value = isString(value) ? value : JSON.stringify(value);
  if (btoa) {
    return btoa(value);
  }

  return Buffer.from(value).toString('base64');
};

const buildFetchObject = ({ data, attributes = {} }, accessToken) => {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        {
          data: base64Encode(data),
          attributes
        }
      ]
    })
  };
};

module.exports = async ({ utils }) => {
  const { getExtensionSettings, getSettings, fetch } = utils;
  const {
    credentials: { accessToken }
  } = getExtensionSettings();
  const settings = getSettings();
  const { topic } = settings;

  return fetch(
    `https://pubsub.googleapis.com/v1/${topic}:publish`,
    buildFetchObject(settings, accessToken)
  );
};
