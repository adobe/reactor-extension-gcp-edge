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
import { Heading, Flex, ContextualHelp, Content } from '@adobe/react-spectrum';
import WrappedTextField from '../../../components/wrappedTextField';

export default function CredentialsSectionFields() {
  return (
    <Flex gap="size-150" direction="column">
      <Heading level="3">Credentials</Heading>
      <WrappedTextField
        width="size-4600"
        name="credentials.accessToken"
        label="Access Token"
        necessityIndicator="label"
        isRequired
        supportDataElement
        contextualHelp={
          <ContextualHelp>
            <Heading>Need help?</Heading>
            <Content>
              <p>
                For the access token you can use a data element associated with
                an OAuth2 secret.
              </p>
            </Content>
          </ContextualHelp>
        }
      />
    </Flex>
  );
}
