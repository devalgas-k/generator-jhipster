/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import chalk from 'chalk';
import { JHipsterCommandDefinition } from '../base/api.js';
import { GENERATOR_COMMON, GENERATOR_JAVA, GENERATOR_LIQUIBASE, GENERATOR_SPRING_DATA_RELATIONAL } from '../generator-list.js';
import { APPLICATION_TYPE_GATEWAY, APPLICATION_TYPE_MICROSERVICE, APPLICATION_TYPE_MONOLITH } from '../../jdl/index.js';

const command: JHipsterCommandDefinition = {
  options: {
    authenticationType: {
      name: 'auth',
      description: 'Provide authentication type for the application when skipping server side generation',
      type: String,
      scope: 'storage',
    },
    db: {
      description: 'Provide DB name for the application when skipping server side generation',
      type: String,
    },
    incrementalChangelog: {
      description: 'Creates incremental database changelogs',
      type: Boolean,
      scope: 'storage',
    },
    skipUserManagement: {
      description: 'Skip the user management module during app generation',
      type: Boolean,
      scope: 'storage',
    },
    recreateInitialChangelog: {
      description: 'Recreate the initial database changelog based on the current config',
      type: Boolean,
    },
    buildTool: {
      name: 'build',
      description: 'Provide build tool for the application when skipping server side generation',
      type: String,
      scope: 'storage',
    },
    cacheProvider: {
      description: 'Cache provider',
      type: String,
      scope: 'storage',
    },
    enableSwaggerCodegen: {
      description: 'API first development using OpenAPI-generator',
      type: Boolean,
      scope: 'storage',
    },
    enableHibernateCache: {
      description: 'Enable hibernate cache',
      type: Boolean,
      scope: 'storage',
    },
    messageBroker: {
      description: 'message broker',
      type: String,
      scope: 'storage',
    },
    reactive: {
      description: 'Generate a reactive backend',
      type: Boolean,
      scope: 'storage',
    },
    searchEngine: {
      description: 'Provide search engine for the application when skipping server side generation',
      type: String,
      scope: 'storage',
    },
    skipCheckLengthOfIdentifier: {
      description: 'Skip check the length of the identifier, only for recent Oracle databases that support 30+ characters metadata',
      type: Boolean,
      scope: 'storage',
    },
    skipDbChangelog: {
      description: 'Skip the generation of database migrations',
      type: Boolean,
    },
    skipFakeData: {
      description: 'Skip generation of fake data for development',
      type: Boolean,
      scope: 'storage',
    },
    websocket: {
      description: 'Provide websocket option for the application when skipping server side generation',
      type: String,
      scope: 'storage',
    },
    projectVersion: {
      description: 'project version to use, this option is not persisted',
      type: String,
      env: 'JHI_PROJECT_VERSION',
      scope: 'generator',
    },
    jhipsterDependenciesVersion: {
      description: 'jhipster-dependencies version to use, this option is not persisted',
      type: String,
      env: 'JHIPSTER_DEPENDENCIES_VERSION',
      scope: 'generator',
    },
    fakeKeytool: {
      description: 'Add a fake certificate store file for test purposes',
      type: Boolean,
      env: 'FAKE_KEYTOOL',
      scope: 'generator',
      hide: true,
    },
  },
  configs: {
    applicationType: {
      description: 'Application type to generate',
      cli: {
        type: String,
      },
      prompt: {
        type: 'list',
        message: `Which ${chalk.yellow('*type*')} of application would you like to create?`,
      },
      choices: [
        {
          value: APPLICATION_TYPE_MONOLITH,
          name: 'Monolithic application (recommended for simple projects)',
        },
        {
          value: APPLICATION_TYPE_GATEWAY,
          name: 'Gateway application',
        },
        {
          value: APPLICATION_TYPE_MICROSERVICE,
          name: 'Microservice application',
        },
      ],
    },
    feignClient: {
      description: 'Generate a feign client',
      cli: {
        type: Boolean,
      },
      prompt: {
        type: 'confirm',
        message: 'Do you want to generate a feign client?',
        when: currentAnswer =>
          currentAnswer.applicationType === APPLICATION_TYPE_MICROSERVICE &&
          currentAnswer.reactive !== undefined &&
          !currentAnswer.reactive,
      },
      default: false,
    },
    syncUserWithIdp: {
      description: 'Allow relationships with User for oauth2 applications',
      cli: {
        type: Boolean,
      },
      prompt: gen => ({
        type: 'confirm',
        message: 'Do you want to allow relationships with User entity?',
        when: ({ authenticationType }) => (authenticationType ?? gen.jhipsterConfigWithDefaults.authenticationType) === 'oauth2',
      }),
      default: false,
    },
  },
  import: [GENERATOR_COMMON, GENERATOR_JAVA, GENERATOR_LIQUIBASE, GENERATOR_SPRING_DATA_RELATIONAL],
};

export default command;
