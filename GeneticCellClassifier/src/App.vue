<template>
  <h1>Upload Here</h1>

  <file-handler>

  </file-handler>
  <span>{{ cellClassifications }}</span>

</template>

<script>

import { onMounted } from 'vue';


export default{
  setup(){
    var simplifiedTestData, positiveClassificationsToCellTypes, cellClassifications;
    onMounted(async () => {
      simplifiedTestData = await ParseAndSimplifyTestData();
      positiveClassificationsToCellTypes = await ParseAndBuildClassificationDictionary();
      cellClassifications = await AssociatePositiveClassificationsToTestData();

      console.log("Positive Associated Cell Classifications:");
      console.log(cellClassifications);
    });

    async function AssociatePositiveClassificationsToTestData() {
      var associatedData = new Map();

      simplifiedTestData.forEach(simpleTestData => { associatedData.set(simpleTestData['Object ID'], GetClassificationFromData(simpleTestData['Classification'])); });

      return associatedData;
    }
    function GetClassificationFromData(sampleClassifications) {
        var sampleClassification = new Map();
        
        sampleClassifications.forEach(sc => { sampleClassification.set(sc, positiveClassificationsToCellTypes.get(sc)); });

        return sampleClassification;
    }
    
    async function ParseAndBuildClassificationDictionary() {
        var classifications = JSON.parse(await GetJsonFileContents('./qupath_cell_classification_with_trained_object_classifiers.json'));
        var newPositiveClassifications = new Map();

        classifications.forEach(classification => Object.keys(classifications).forEach(k => {
            if (classifications[k] == 1)
                newPositiveClassifications.has(k) ? newPositiveClassifications.get(k).push(classifications['Cell Type']) : newPositiveClassifications.set(k, [classifications['Cell Type']]);
        }));

        return newPositiveClassifications;
    }

    async function ParseAndSimplifyTestData() {
        let testData = JSON.parse(await GetJsonFileContents('./test data set.json'));
        var newSimplifiedData = [];
        
        testData.forEach(td => {
            newSimplifiedData.push({
                "Object ID": td["Object ID"],
                "Classification": td["Classification"].split(': '),
            });
        });
        return newSimplifiedData;
    }
    
    async function GetJsonFileContents(filePath) {
      var fileContents;

      await fetch(filePath)
        .then( res => res.json() )
        .then( (data) => {
          fileContents = data;
        })
        return JSON.stringify(fileContents);
    }
    return { positiveClassificationsToCellTypes, simplifiedTestData, cellClassifications };
  }
}
</script>

<style scoped></style>
