// Perceptron Algorithm

var sampleData = require('./datasamples/iris.js');

function perceptron(data) {
	var cont = true;
	var tries = 0;

	while (cont) {
		var incorrect = 0;
		tries++;
		console.log('Iteration: ' + tries);
		console.log('Weights: ' + JSON.stringify(data.weights));
		for (var instance = 0; instance < data.trainingSet.length; instance++) {
			var prediction = generatePerceptronHypothesis(data.weights, data.trainingSet[instance]);
			if (data.outputs[prediction.toString()] !== data.trainingSet[instance].class) {
				for (var attribute in data.weights) {
					var change = (prediction * -1 * data.trainingSet[instance][attribute]);
					data.weights[attribute] += change;
				}
				incorrect++;
			}
		}

		console.log('\nAmount incorrect: ' + incorrect + '\n\n');

		if (incorrect === 0) {
			var func = '1 + ';
			for (var attribute in sampleData.weights) {
				func += '(' + sampleData.weights[attribute] + '*' + attribute + ') + ';
			}
			console.log('\n\nFound Perceptron Function: ' + func.substring(0, func.length - 2));
			cont = false;
		}

		if (tries > 50) {
			cont = false;
		}
	}
}

var BIAS = 1;

function generatePerceptronHypothesis(weights, instance) {
	var val = BIAS;
	for (var attribute in weights) {
		val += (weights[attribute] * instance[attribute]);
	}

	var sign = val <= 0 ? -1 : 1;
	return sign;
}

perceptron(sampleData);
