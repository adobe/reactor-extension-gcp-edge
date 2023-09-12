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
import { Flex, Link, Content, Text } from '@adobe/react-spectrum';

import ExtensionView from '../components/extensionView';

import TopicFields from './components/topicSection/fields';
import getTopicInitValues from './components/topicSection/getInitValues';
import getTopicSettings from './components/topicSection/getSettings';
import validateTopicFields from './components/topicSection/validate';

import DataFields from './components/dataSection/fields';
import getDataInitValues from './components/dataSection/getInitValues';
import getDataSettings from './components/dataSection/getSettings';
import validateDataFields from './components/dataSection/validate';

import AttributesFields from './components/attributesSection/fields';
import getAttributesInitValues from './components/attributesSection/getInitValues';
import getAttributesSettings from './components/attributesSection/getSettings';
import validateAttributesFields from './components/attributesSection/validate';

export default function SendDataToCloudPubSub() {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getTopicInitValues(initInfo),
        ...getDataInitValues(initInfo),
        ...getAttributesInitValues(initInfo)
      })}
      getSettings={({ values }) => ({
        ...getTopicSettings(values),
        ...getDataSettings(values),
        ...getAttributesSettings(values)
      })}
      validate={(values) => ({
        ...validateTopicFields(values),
        ...validateDataFields(values),
        ...validateAttributesFields(values)
      })}
      render={() => (
        <Flex direction="column" gap="size-75">
          <Content>
            <Text>These events will be sent to Cloud Platform using the</Text>{' '}
            <Link>
              <a
                href="https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics/publish"
                target="_blank"
                rel="noreferrer"
              >
                Pub/Sub Publish
              </a>
            </Link>{' '}
            endpoint .
          </Content>
          <TopicFields />
          <DataFields />
          <AttributesFields />
        </Flex>
      )}
    />
  );
}
