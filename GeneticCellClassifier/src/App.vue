<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <file-handler>

  </file-handler>
</template>

<script>
//import FileHandler from './FileHandler.vue';



export default{
  setup(){
    //const positiveClassificationsToCellTypes = ParseAndBuildClassificationDictionary();
    //const simplifiedTestData = ParseAndSimplifyTestData();
    //const classifications = AssociatePositiveClassificationsToTestData();

    let positiveClassificationsToCellTypes = "";
    let simplifiedTestData = "";
    let classifications = "";

  function AssociatePositiveClassificationsToTestData() {
    var associatedData = new Map();

    simplifiedTestData.forEach(simpleTestData => { associatedData.set(simpleTestData['Object ID'], GetClassificationFromData(simpleTestData['Classification'])); });

    return associatedData;
  }
  function GetClassificationFromData(sampleClassifications) {
      var sampleClassification = new Map();
      
      sampleClassifications.forEach(sc => { sampleClassification.set(sc, positiveClassificationsToCellTypes.get(sc)); });

      return sampleClassification;
  }
  
  function ParseAndBuildClassificationDictionary() {
      //TODO hard coded file path
      var classifications = GetJsonFileContents('C:\\Users\\merse\\source\\repos\\GeneClassifier\\GeneClassifier\\data\\qupath_cell_classification_with_trained_object_classifiers.json');
      var newPositiveClassifications = new Map();

      classifications.forEach(classification => Object.keys(classification).forEach(k => {
          if (classification[k] == 1)
              newPositiveClassifications.has(k) ? newPositiveClassifications.get(k).push(classification['Cell Type']) : newPositiveClassifications.set(k, [classification['Cell Type']]);
      }));

      return newPositiveClassifications;
  }

  function ParseAndSimplifyTestData() {
      //TODO hard coded file path
      var testData = GetJsonFileContents('C:\\Users\\merse\\source\\repos\\GeneClassifier\\GeneClassifier\\data\\test data set.json');
      var testData = "stuff";
      var newSimplifiedData = [];

      testData.forEach(td => {
          newSimplifiedData.push({
              "Object ID": td["Object ID"],
              "Classification": td["Classification"].split(': '),
          });
      });

      return newSimplifiedData;
  }
  function GetJsonFileContents(filePath) {

      //return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return "";
  }

    return { positiveClassificationsToCellTypes, simplifiedTestData, classifications };
  }
}
</script>

<style scoped></style>
