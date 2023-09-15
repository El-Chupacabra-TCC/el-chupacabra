import os from 'os';
import crypto from 'crypto';
import IExecutionProfile from './IExecutionProfile';
import ITask from '../Tasks/ITask';

/**
 * Represents a profile for collecting execution data in a Node.js environment.
 * @implements {IExecutionProfile}
 */
export default class NodeExecutionProfile implements IExecutionProfile {
    /**
     * @inheritdoc
     */
    async collect(taskBeingExecuted: ITask): Promise<Record<string, any>> {
        const networkInterfaces = os.networkInterfaces()
        const executionProfile: Record<string, any> = {
            software: {
                type: "NodeJS",
                npmVersion: process.versions.npm,
                nodeVersion: process.versions.node,
                v8Version: process.versions.v8
            },
            os: {
                platform: os.platform(),
                arch: os.arch(),
                username: os.userInfo().username,
                hostname: os.hostname(),
                homedir: os.homedir(),
                shell: os.userInfo().shell,
            },
            hardware: {
                cpuModel: os.cpus()[0].model,
                totalMemory: os.totalmem(),
                macAddresses: Object.values(networkInterfaces)
                    .flatMap(interfaces => interfaces?.map(iface => iface.mac))
                    .filter(mac => mac !== undefined)
            },
            volatile: {
                deviceUptime: os.uptime(),
                environmentVariables: Object.keys(process.env).sort()
            }
        }

        const fingerprintString = JSON.stringify(
            {
                software: executionProfile.software,
                os: executionProfile.os,
                hardware: executionProfile.hardware
            })
        executionProfile.visitorId = this.getVisitorId(fingerprintString)

        return Promise.resolve(executionProfile)
    }

    private getVisitorId(input: string): string {
        return crypto.createHash('sha256').update(input).digest('hex');
    }
}
