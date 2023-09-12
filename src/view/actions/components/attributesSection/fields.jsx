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

import React from 'react';
import { useFormContext } from 'react-hook-form';

import getEmptyDataJson from './getEmptyValue';

import PayloadEditor from '../../../components/rawJsonEditor';
import PayloadRow from './row';

import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../../utils/entityVariablesConverter';

export default function AttributesSectionFields() {
  const { setValue, watch } = useFormContext();
  const [attributesRaw, attributesJsonPairs] = watch([
    'attributesRaw',
    'attributesJsonPairs'
  ]);

  return (
    <PayloadEditor
      label="Attributes"
      radioLabel="Select the way you want to provide the attributes"
      description="The attributes can be a valid JSON object, or a data element."
      typeVariable="attributesType"
      rawVariable="attributesRaw"
      jsonVariable="attributesJsonPairs"
      getEmptyJsonValueFn={getEmptyDataJson}
      row={PayloadRow}
      onTypeSwitch={(v) => {
        // Auto Update Data Content
        if (v === 'json') {
          let variables = [];
          try {
            variables = addToVariablesFromEntity([], JSON.parse(attributesRaw));
          } catch (e) {
            // Don't do anything
          }

          if (variables.length === 0) {
            variables.push(getEmptyDataJson());
          }

          setValue('attributesJsonPairs', variables, {
            shouldValidate: true,
            shouldDirty: true
          });
        } else if (
          attributesJsonPairs.length > 1 ||
          attributesJsonPairs[0].key
        ) {
          let entity = JSON.stringify(
            addToEntityFromVariables({}, attributesJsonPairs),
            null,
            2
          );

          if (entity === '{}') {
            entity = '';
          }

          setValue('attributesRaw', entity, {
            shouldValidate: true,
            shouldDirty: true
          });
        }
        // END: Auto Update Data Content
      }}
    />
  );
}
