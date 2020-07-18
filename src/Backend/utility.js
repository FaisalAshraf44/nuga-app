import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {_storeData, _retrieveData} from './AsyncFuncs';

export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  querySnapshot.forEach(function(doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function(doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export function getDataOrderBy(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function(doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function getDocRefByKeyValue(collection, key, value) {
  return firebase
    .firestore()
    .collection(collection)
    .where(key, '==', value)
    .get()
    .then(function(querySnapshot) {
      return querySnapshot.docs[0];
    });
}

export async function getDocByKeyValue(collection, key, value) {
  let data = [];
  let querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .where(key, '==', value)
    .get();
  await querySnapshot.forEach(function(doc) {
    data.push(doc.data());
  });
  return data;
}

export async function getDocWithIdByKeyValue(collection, key, value) {
  let data = [];
  let querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .where(key, '==', value)
    .get();
  await querySnapshot.forEach(function(doc) {
    let obj = doc.data();
    obj.id = doc.id;
    data.push(obj);
  });
  return data;
}

export async function getDocWithinRange(collection, doc, strSearch) {
  let strlength = strSearch.length;
  let strFrontCode = strSearch.slice(0, strlength - 1);
  let strEndCode = strSearch.slice(strlength - 1, strSearch.length);

  let startcode = strSearch;
  let endcode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

  return firebase
    .firestore()
    .collection(collection)
    .where(doc, '>=', startcode)
    .where(doc, '<', endcode)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
      });
    });
}

export async function saveData(collection, doc, jsonObject) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .catch(function(error) {
      throw error;
    });
  //console.log("Document successfully written!");
}

export async function saveDataWithDocId(collection, doc, jsonObject) {
  return firebase
    .firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .then(async function() {
      console.log('Document successfully written!');
      return true;
    })
    .catch(function(error) {
      console.error('Error writing document: ', error);
    });
}

export async function saveDataWithoutDocId(collection, jsonObject) {
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc();
  docRef.set(jsonObject);
  return docRef;
}

export async function addToArray(collection, doc, array, value) {
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  } else {
    saveData(collection, doc, {[array]: [value]});
  }
}

export async function updateArray(collection, doc, array, value, index) {
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef
      .update({
        [array]: firebase.firestore.FieldValue.arrayRemove(
          docData.data()[array][index],
        ),
      })
      .then(async () => {
        let docRef1 = await firebase
          .firestore()
          .collection(collection)
          .doc(doc);
        let docData1 = await docRef1.get();
        if (docData1.exists && docData1.data()[array] != undefined) {
          docRef1.update({
            [array]: firebase.firestore.FieldValue.arrayUnion(value),
          });
        }
      });
  }
}
export async function removeItemfromArray(collection, doc, array, index) {
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayRemove(
        docData.data()[array][index],
      ),
    });
  }
}

// washingtonRef.update({
//   regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
// });

export async function addElementToNestedArray(collection, doc, array, obj) {
  let db = firebase.firestore();

  db.collection(collection)
    .doc(doc)
    .update({
      [array]: firebase.firestore.FieldValue.arrayUnion(obj),
    });
}

export async function removeElementFromNestedArray(
  collection,
  doc,
  array,
  obj,
) {
  let db = firebase.firestore();

  db.collection(collection)
    .doc(doc)
    .update({
      [array]: firebase.firestore.FieldValue.arrayRemove(obj),
    });
}

export async function addToArrayUpdate(collection, doc, array, value) {
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.set({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  }
}

export async function deleteField(collection, doc, field) {
  let db = firebase.firestore();
  const fruitRef = db.collection(collection).doc(doc);
  // Remove the 'apple' field from the document
  const removeFruit = fruitRef.update({
    [field]: firebase.firestore.FieldValue.delete(),
  });
  return removeFruit;
  // let docRef = await firebaseData.child(collection).child(doc).child([field])
  // return firebase.database().ref(collection).doc(doc).child([field]).remove();
}

export async function deleteDocument(collection, doc, field) {
  let db = firebase.firestore();

  db.collection(collection)
    .doc(doc)
    .delete()
    .then(function() {
      console.log('Document successfully deleted!');
    })
    .catch(function(error) {
      console.error('Error removing document: ', error);
    });
}

export default firebase;
