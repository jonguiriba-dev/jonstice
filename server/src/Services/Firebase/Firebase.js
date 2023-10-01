const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../jonstice-885bc-firebase-adminsdk-1iefd-ca25439d4c.json");

class FirebaseService {
  static db;

  static init() {
    initializeApp({ credential: cert(serviceAccount) });
    FirebaseService.db = getFirestore();
  }

  static save(path, data) {
    return FirebaseService.db.collection(path).add(data);
  }

  static get(path, opts = {}) {
    let collection = FirebaseService.db.collection(path);

    if (opts.orderBy) {
      collection = collection.orderBy(
        opts.orderBy[0],
        opts.orderBy[1] || "desc"
      );
    }

    return collection.get();
  }
}

module.exports = FirebaseService;
