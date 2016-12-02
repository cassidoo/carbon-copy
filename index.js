var peopleArray = [];
var nameList = [];
var modelId = '';

function createNameList() {
  nameList = [$('#name0').val(), $('#name1').val()];
  console.log('Initialized name list. ' + nameList);
  $('.name-form').hide(500);
  $('.pic-form').show(500);
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
  var modelName = 'fam' + Math.floor((Math.random() * 10000) + 1);
  app.models.create(modelName, nameList).then(
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
  $('.pic-form').hide(500);
  $('.result-form').show(500);
  console.log('It worked');
  console.log(model);
    
  modelId = model.data.model_version.id;
}

function compareFaces() {
  var baby = $('#me').val();
  console.log('Model ID: ' + modelId);
  console.log('Baby pic: ' + baby);
  app.models.predict(modelId, [baby]).then(
    function(response) {
      console.log(response);
    }, errorHandler
  );
}