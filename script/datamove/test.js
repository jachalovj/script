const megalandmongo = require("./megalandmongo");
megalandmongo.initDB()


const test = async () => {
  const result = await megalandmongo.getMembersByMobile([])
  console.log(result);
}
test()