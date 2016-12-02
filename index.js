var peopleArray = [];
var nameList = [];
var modelId = '';

function createNameList() {
  nameList = [$('#name0').val(), $('#name1').val()];
  console.log('Initialized name list. ' + nameList);
}

function addPerson() {
  var name = $('#name').val();
  var url = $('#photo').val();
  var otherName = nameList.includes(name, 1) ? nameList[1] : nameList[0];
  peopleArray.push({
    "url": url,
    "concepts": [
      { "id": name, "value": true },
      { "id": otherName, "value": false }
    ]
  });
  $('#name').val('');
  $('#photo').val('');
}

function createFam() {
  app.models.create('fam', nameList).then(
    trainModel,
    errorHandler
  );
}

function trainModel(model) {
  model.train().then(
    ready,
    errorHandler
  );
}

function errorHandler(err) {
  console.error(err);
}

function ready(model) {
    console.log('It worked');
    console.log(model);
    modelId = model.versionId;
}

function compareFaces() {
  var baby = $('#me').val();
  model.predict(modelId, [baby]).then(
    function(response) {
      console.log(response);
    }, errorHandler
  );
}