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

/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import WrappedTextField from '../../../components/wrappedTextField';

export default function RequestSectionFields() {
  return (
    <WrappedTextField
      minWidth="size-4600"
      width="size-6000"
      name="topic"
      label="Topic"
      description={
        'Topic with the format "projects/{{projectId}}/topics/{{topicName}}".'
      }
      necessityIndicator="label"
      isRequired
      supportDataElement
    />
  );
}
