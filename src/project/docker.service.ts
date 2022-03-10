// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as fs from 'fs';
import { exec } from 'child_process';
import { Injectable } from '@nestjs/common';
import { getLogger } from 'src/utils/logger';
import { getComposeFilePath, projectContainers, projectId } from 'src/utils/docker';

@Injectable()
export class DockerService {
  constructor() { }

  async up(fileName: string): Promise<string> {
    const filePath = getComposeFilePath(`${fileName}.yml`);
    if (fs.existsSync(filePath)) {
      getLogger('docker').info(`start new project ${fileName}`);
      try {
        await this.rm(projectContainers(fileName));
        getLogger('docker').info(`remove the old containers`);
      } catch (_) {
        getLogger('docker').info(`no containers need to be removed`);
      }

      return this.execute(`docker-compose -f ${filePath} -p ${projectId(fileName)} up -d`);
    } else {
      getLogger('docker').error(`file: ${filePath} not exist`);
    }
  }

  async start(containers: string[]): Promise<string> {
    try {
      return this.execute(`docker start ${containers.join(' ')}`);
    } catch (e) {
      getLogger('docker').error(`failed to restart the containers: ${e}`);
    }
  }

  async stop(containers: string[]): Promise<string> {
    try {
      return this.execute(`docker stop ${containers.join(' ')}`);
    } catch (e) {
      getLogger('docker').error(`failed to stop the containers: ${e}`);
    }
  }

  rm(containers: string[]): Promise<string> {
    return this.execute(`docker container rm ${containers.join(' ')}`);
  }

  ps(): Promise<string> {
    return this.execute('docker container ps -a');
  }

  // TODO: support logs for node | query services
  logs(container: string): Promise<string> {
    // TODO: the format of the text?
    return this.execute(`docker logs -l ${container}`);
  }

  async createDB(name: string): Promise<string> {
    getLogger('docker').info(`create new db: ${name}`);
    const dbDocker = process.env.DOCKER_DB ?? 'coordinator_db';
    try {
      return this.execute(
        `docker exec -i ${dbDocker} psql -U postgres -c "create database ${name}"`,
      );
    } catch (e) { }
  }

  execute(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          // TODO: output this only with verbose [process.env.VERBOSE]
          // getLogger('docker').error(error);
          reject(error);
        } else if (stdout) {
          getLogger('docker').info(stdout);
        } else {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
}
