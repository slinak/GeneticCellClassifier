<template>
  <h1>Click to get Positive Associated Cell Classifications</h1>
  <input type="button" value="Click" v-on:click="getPositiveClassifications" />
  
  <table>
    <tr v-for="(c) in content">
      <td>{{ c }}</td>
    </tr>
  </table>

</template>

<script>
import { ref, onMounted } from 'vue';

const displayElement = ref(null);

export default{
  setup(){
    let content = ref(0);
    
    var simplifiedTestData, positiveClassificationsToCellTypes, cellClassifications, associatedTestData;
    onMounted(async () => {
      simplifiedTestData = await ParseAndSimplifyTestData();
      positiveClassificationsToCellTypes = await ParseAndBuildClassificationDictionary();
      cellClassifications = await AssociatePositiveClassificationsToTestData();
      associatedTestData = await GetTestData();

      cellClassifications.forEach(c => {
        associatedTestData.forEach(td => {
          td["Positive Classification"] = c;
        });
      });
    });

    function getPositiveClassifications() { content.value = associatedTestData; }

    async function AssociatePositiveClassificationsToTestData() {
      var associatedData = new Map();

      simplifiedTestData.forEach(simpleTestData => { associatedData.set(simpleTestData['Object ID'], GetClassificationFromData(simpleTestData['Classification'])); });

      return associatedData;
    }

    function GetClassificationFromData(sampleClassifications) {
        var sampleClassification = [];
        
        sampleClassifications.forEach(sc => {
          sampleClassification = sampleClassification.concat(positiveClassificationsToCellTypes.get(sc));
        });

        return sampleClassification.join(", ");
    }
    
    async function ParseAndBuildClassificationDictionary() {
        var classifications = JSON.parse(await GetJsonFileContents('./qupath_cell_classification_with_trained_object_classifiers.json'));
        var newPositiveClassifications = new Map();

        classifications.forEach(classification => Object.keys(classification).forEach(k => {
            if (classification[k] == 1)
              newPositiveClassifications.has(k) ? newPositiveClassifications.get(k).push(classification['Cell Type']) : newPositiveClassifications.set(k, [classification['Cell Type']]);
        }));

        return newPositiveClassifications;
    }

    async function GetTestData() {
      return JSON.parse(await GetJsonFileContents('./test data set.json'));
    }

    async function ParseAndSimplifyTestData() {
        let testData = JSON.parse(await GetJsonFileContents('./test data set.json'));
        var newSimplifiedData = [];
        var separator = new RegExp(' :|: ');
        
        testData.forEach(td => {
            newSimplifiedData.push({
                "Object ID": td["Object ID"],
                "Classification": td["Classification"].split(separator),
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
    return { getPositiveClassifications, content };
  }
}
</script>

<style scoped></style>
