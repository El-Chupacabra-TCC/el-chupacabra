# El Chupacabra :goat:

Library for performance evaluation of client side applications.

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```js
    import { EasyElc, ExecutionProfiles, Persisters, Metrics } from "el-chupacabra";

    const easyElc = new EasyElc(
        new ExecutionProfiles.NodeExecutionProfile(),
        new Persisters.JsonFilePersister("./result.json")
    );

    const profiling = easyElc.startProfiling("uniqueName", [new Metrics.DeltaTimeMetric()]);

    // Do something

    profiling.finish();
```

## Instalation

This package can be installed through the [npm registry](https://www.npmjs.com/).

```console
$ npm install el-chupacabra
```

## Features

* Plug & Play with EasyElc interface.
* Effortless data collection from remote executions.
* Builtin integration with Google Sheets.
* Builtin black box metrics.
* Highly extensible.
* Compatible with [Node.js](https://nodejs.org/en/) and Browser environments.

## Documentation

Check it out on the project [Github repository](https://github.com/El-Chupacabra-TCC/el-chupacabra).

## Examples

* [First n Primes Calculator](https://el-chupacabra-tcc.github.io/FirstNPrimes/): Website which calculates the prime numbers sequence in your browser and collects the time spent on each task.
    
