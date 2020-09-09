const program = require('commander')
const natural = require('natural')

const classifier = new natural.BayesClassifier()

const fs = require('fs')

program
  .command('train')
  .option(
    '-t, --training-set <file>',
    'training set file name',
    'training_set.json'
  )
  .option('-m, --model <file>', 'model file name', 'model.json')
  .description('Trains the classifier and saves the model')
  .action((cmd) => {
    const rawFile = fs.readFileSync(cmd.trainingSet)

    const training_set = JSON.parse(rawFile)

    for (const key in training_set) {
      if (Object.prototype.hasOwnProperty.call(training_set, key)) {
        const samples = training_set[key]

        samples.forEach((sample) => {
          classifier.addDocument(sample, key)
        })
      }
    }

    classifier.train()
    classifier.save(cmd.model)
  })

program
  .command('classify [sample]')
  .option('-s, --samples <file>', 'test samples file', 'samples.json')
  .option('-m, --model <file>', 'model file', 'model.json')
  .option('-b, --best-match', 'show only best match', false)
  .description('Classify a samples or samples from a file applying a model')
  .action((sample, cmd) => {
    natural.BayesClassifier.load(cmd.model, null, (err, clazzifier) => {
      if (err) throw err
      const classify = (sample, bestMatch) => {
        if (!bestMatch) return clazzifier.getClassifications(sample)
        return clazzifier.classify(sample)
      }
      if (sample) console.log(classify(cmd.bestMatch))
      else {
        const rawdata = fs.readFileSync(cmd.samples)
        const samples = JSON.parse(rawdata)

        samples.forEach((sample) => {
          console.log(classify(sample, cmd.bestMatch))
        })
      }
    })
  })

program.parse()
