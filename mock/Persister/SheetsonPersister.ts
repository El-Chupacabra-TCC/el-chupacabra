class SheetsonPersister implements IPersister {
  save(data: string): void{
    console.log('SheetsonPersister.save()');
    console.log(data);
    console.log('SheetsonPersister.end()');
  }
}
