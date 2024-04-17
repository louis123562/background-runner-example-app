//---------------------------------------------------------------
// Events
//---------------------------------------------------------------

addEventListener("setName", (resolve, reject, args) => {
  console.log(JSON.stringify(args.of));
  const result = CapacitorKV.set("Name", args.of);
  resolve();
});

addEventListener("getName", (resolve, reject, args) => {
  try {
    const result = CapacitorKV.get("Name");
    console.log("TESTOOO: " + JSON.stringify(result));
    resolve(result);
  } catch (err) {
    console.error(err);
    console.error(JSON.stringify(err));
    reject(err);
  }
});
