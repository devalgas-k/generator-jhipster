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

import { before, it, describe } from 'esmocha';
import { expect } from 'chai';
import createJDLApplication from '../models/jdl-application-factory.js';
import { convertApplicationsToJDL } from '../converters/json-to-jdl-application-converter.js';
import JDLObject from '../models/jdl-object.js';
import { applicationTypes } from '../jhipster/index.js';

const { MONOLITH } = applicationTypes;

describe('jdl - JSONToJDLApplicationConverter', () => {
  describe('convert', () => {
    describe('when not passing any argument', () => {
      let jdlObject;

      before(() => {
        jdlObject = convertApplicationsToJDL();
      });

      it('should return an empty jdl object', () => {
        expect(jdlObject.getApplicationQuantity()).to.equal(0);
      });
    });
    describe('when not passing a jdl object', () => {
      let jdlObject;

      before(() => {
        jdlObject = convertApplicationsToJDL({
          applications: [{ 'generator-jhipster': { baseName: 'toto', applicationType: MONOLITH } }],
        });
      });

      it('should return the converted applications', () => {
        expect(jdlObject.applications.toto).to.deep.equal(createJDLApplication({ applicationType: MONOLITH, baseName: 'toto' }));
      });
    });
    describe('when passing a jdl object', () => {
      let jdlObject;

      before(() => {
        const previousJDLObject = new JDLObject();
        previousJDLObject.addApplication(createJDLApplication({ baseName: 'tata', applicationType: MONOLITH }));
        jdlObject = convertApplicationsToJDL({
          applications: [{ 'generator-jhipster': { baseName: 'toto', applicationType: MONOLITH } }],
          jdl: previousJDLObject,
        });
      });

      it('should add the converted applications', () => {
        expect(jdlObject.applications.tata).to.deep.equal(createJDLApplication({ applicationType: MONOLITH, baseName: 'tata' }));
        expect(jdlObject.applications.toto).to.deep.equal(createJDLApplication({ applicationType: MONOLITH, baseName: 'toto' }));
      });
    });
  });
});
