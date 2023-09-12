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

/* eslint-disable no-template-curly-in-string */

import { screen } from '@testing-library/react';
import renderView from '../../__tests_helpers__/renderView';
import { changeInputValue } from '../../__tests_helpers__/jsDomHelpers';

import SendDataToCloudPubSub from '../sendDataToCloudPubSub';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFromFields = () => ({
  topicField: screen.getByLabelText(/Topic/i),
  dataField: screen.getByLabelText(/data/i, {
    selector: '[name="dataRaw"]'
  }),
  attributesField: screen.getByLabelText(/attributes/i, {
    selector: '[name="attributesRaw"]'
  })
});

describe('Send data to Cloud Pub Sub view', () => {
  test('sets form values from setting', async () => {
    renderView(SendDataToCloudPubSub);

    extensionBridge.init({
      settings: {
        topic: 'projects/123/topics/ABC',
        data: {
          price: '200',
          quantity: '2'
        },
        attributes: {
          by: 'Launch'
        }
      }
    });

    const { topicField, dataField, attributesField } = getFromFields();

    expect(topicField.value).toBe('projects/123/topics/ABC');
    expect(dataField.value).toBe('{\n  "price": "200",\n  "quantity": "2"\n}');
    expect(attributesField.value).toBe('{\n  "by": "Launch"\n}');
  });

  test('sets settings from form values', async () => {
    renderView(SendDataToCloudPubSub);

    extensionBridge.init({
      settings: {
        topic: 'projects/123/topics/ABC',
        data: {
          price: '200',
          quantity: '2'
        },
        attributes: {
          by: 'Launch'
        }
      }
    });

    const { topicField, dataField, attributesField } = getFromFields();

    await changeInputValue(topicField, 'new topic');
    await changeInputValue(dataField, '{{"a":"c"}');
    await changeInputValue(attributesField, '{{{{dataElement}}');

    expect(extensionBridge.getSettings()).toEqual({
      topic: 'new topic',
      data: {
        a: 'c'
      },
      attributes: '{{dataElement}}'
    });
  });

  test('handles default form validation correctly', async () => {
    renderView(SendDataToCloudPubSub);

    extensionBridge.init({
      settings: {
        topic: 'topic',
        data: {
          a: 'b'
        }
      }
    });

    const { topicField, dataField } = getFromFields();

    expect(topicField).not.toHaveAttribute('aria-invalid', 'true');
    await changeInputValue(topicField, '');

    expect(dataField).not.toHaveAttribute('aria-invalid', 'true');
    await changeInputValue(dataField, '');

    await extensionBridge.validate();

    expect(topicField).toHaveAttribute('aria-invalid', 'true');
    expect(dataField).toHaveAttribute('aria-invalid', 'true');
  });
});
