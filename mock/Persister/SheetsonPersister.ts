import { IPersister } from "./IPersister";
import * as fs from 'fs'

export class SheetsonPersister implements IPersister {
  save(data: any): void{
    console.log('SheetsonPersister.save()');
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("result.json", jsonData);
    console.log('SheetsonPersister.end()');
  }
}
