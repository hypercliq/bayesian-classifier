# BAYESIAN CLASSIFIER

Simple bayesian classifier using [`naturaljs`](https://www.npmjs.com/package/natural)

## Train

```sh
node index.js train
```

The `train` command needs a training set. By default, the program looks for a `training_set.json` which contains labeled samples.

```json
{
  "label1": [
    "sample1",
    "sample2",
    "sample3"
  ],

  "label2": [
    "sample1",
    "sample2",
    "sample3"
  ]
}
```

To load a different training set specify the file name on the command line:

```sh
node index.js train -t "my_training_set.json"
```

A model is created and a file is saved in the current directory with (default) name  `model.json`.
To create a model with a different name:

```sh
node index.js train -m "my_model.json"
```

It is possible to combine the options to load some other training set and to save the model to some other file:

```sh
node index.js train -t "my_training_set.json" -m "my_model.json"
```

At any moment it is possible to access a simple help screen:

```sh
node index.js train --help
```

## Classify

```sh
node index.js classify
```

The `classify` command loads a model file (default `model.json`) and tries to classify one or more test samples.

```sh
node index.js classify "My sample that needs to be classified"
```

When run without a sample argument, it will read samples from a JSON file (default `samples.json`).

```json
[
  "sample1",
  "sample2",
  "sample3"
]
```

Run the `classify` command without arguments:

```sh
node index.js classify
```

To specify a different test samples file:

```sh
node index.js classify -s "my_test_samples.json"
```

It is also possible to specify a different model file to use:

```sh
node index.js classify -m "my_model.json"
```

The classification will show how the test samples score against each trained label.
In order to show only the best match:

```sh
node index.js classify -b
```

Options can be combined and a help screen is available

```sh
node index.js classify --help
```
