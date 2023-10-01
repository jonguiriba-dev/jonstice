const FirebaseService = require("./Firebase");
const { getFirestore } = require("firebase-admin/firestore");

//there should also be a test for the endpoints that mimics an http request but not enough time for it
describe("unit tests", () => {
  const testFirebasePath = "test";

  beforeAll(async () => {
    FirebaseService.init();

    //data and dependencies should be mocked, but I lack the time to setup all the configs
    //so doing it in actual for now just for show
    await getFirestore().collection(testFirebasePath).add({ data: "item 2" });
    await getFirestore().collection(testFirebasePath).add({ data: "item 1" });
    await getFirestore().collection(testFirebasePath).add({ data: "item 3" });
  });

  afterAll(async () => {
    await getFirestore()
      .collection(testFirebasePath)
      .listDocuments()
      .then((val) => {
        val.map((val) => {
          val.delete();
        });
      });
  });

  it("fetches collections", async () => {
    let snapshot = await FirebaseService.get(testFirebasePath);

    let data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    expect(data).toEqual(
      expect.arrayContaining([
        { data: "item 2" },
        { data: "item 1" },
        { data: "item 3" },
      ])
    );
  });

  it("fetches collections and orders them", async () => {
    let snapshot = await FirebaseService.get(testFirebasePath, {
      orderBy: ["data", "asc"],
    });

    let data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    expect(data).toEqual(
      expect.arrayContaining([
        { data: "item 1" },
        { data: "item 2" },
        { data: "item 3" },
      ])
    );
  });

  it("saves data", async () => {
    await FirebaseService.save(testFirebasePath, {
      purpose: "to test if data is saved",
    });

    let data = [];
    let snapshot = await FirebaseService.get(testFirebasePath);
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    expect(data).toEqual(
      expect.arrayContaining([{ purpose: "to test if data is saved" }])
    );
  });

  // should be something like this. Where we just test that
  // the class tried to do it properly but we don't try to test 3rd party code

  //   it("fetches collections", async () => {
  //     mock Firebase
  //     mock setup/functions
  //
  //     await Firebase.get(testFirebasePath)

  //     expect(CollectionReference.prototype.collection).toHaveBeenCalledWith(testFirebasePath)
  //     expect(Query.prototype.get).toHaveBeenCalled()
  //   });
});
