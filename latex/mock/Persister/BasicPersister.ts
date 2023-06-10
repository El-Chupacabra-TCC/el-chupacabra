import { IPersister } from "./IPersister";
import * as fs from 'fs'

export class BasicPersister implements IPersister {
  save(data: any): void{
    console.log('BasicPersister.save()');
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("result.json", jsonData);
    console.log('BasicPersister.end()');
  }
}
