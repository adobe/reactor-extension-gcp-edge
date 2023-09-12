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
import parseJson from '../../../utils/parseJson';
import { isDataElementToken, isObject } from '../../../utils/validators';

export default ({
  attributesJsonPairs = [],
  attributesType,
  attributesRaw
}) => {
  const errors = {};

  if (attributesType === 'raw') {
    if (attributesRaw) {
      if (isDataElementToken(attributesRaw)) {
        return errors;
      }

      const { message = '', parsedJson } = parseJson(attributesRaw);
      if (message || !isObject(parsedJson)) {
        return {
          attributesRaw: `Please provide a valid JSON object or a data element.${
            message ? ` ${message}.` : ''
          }`
        };
      }
    }
  } else if (attributesJsonPairs.length === 1 && !attributesJsonPairs[0].key) {
    errors[`attributesJsonPairs.0.key`] = 'Please provide a key name.';
  } else {
    attributesJsonPairs.forEach((q, index) => {
      if (!q.key && q.value) {
        errors[`attributesJsonPairs.${index}.key`] =
          'Please provide a key name.';
      }
    });
  }

  return errors;
};
