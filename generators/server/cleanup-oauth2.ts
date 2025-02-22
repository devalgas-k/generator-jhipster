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
import type BaseGenerator from '../base/index.js';
import { type GeneratorDefinition as ServerGeneratorDefinition } from '../base-application/generator.js';

type WritingTaskParam = ServerGeneratorDefinition['writingTaskParam'];

/**
 * Removes server files that where generated in previous JHipster versions and therefore
 * need to be removed.
 */
export default function cleanupOldServerFilesTask(this: BaseGenerator, { application }: WritingTaskParam) {
  if (this.isJhipsterVersionLessThan('6.0.0')) {
    this.removeFile(`${application.javaPackageSrcDir}config/OAuth2Configuration.java`);
    this.removeFile(`${application.javaPackageSrcDir}security/OAuth2AuthenticationSuccessHandler.java`);
  }
  if (this.isJhipsterVersionLessThan('7.6.1')) {
    if (!application.databaseTypeNo) {
      this.removeFile(`${application.javaPackageSrcDir}web/rest/UserResource.java`);
    }
  }
}
