---
layout: post
type: blog
title:  "How to Get the Current Run ID using MLFlow in Azure Databricks"
date:   2020-06-26 06:49:33
snippet: In this blog post, you will learn how easy to get the run ID in your current Azure Databricks Notebook. This is helpful especially if you want to use that run ID for deployment within the same notebook that you're working on.
---

In this blog post, you will learn how easy to get the run ID in your current Azure Databricks Notebook. This is helpful especially if you want to use that run ID for deployment within the same notebook that you're working on.

### FTF (First Things First)
#### Install MLflow

What is MLflow?

"MLflow is an open source platform to manage the ML lifecycle, including experimentation, reproducibility, deployment, and a central model registry. MLflow currently offers four components: MLflow Tracking, MLflow Projects, MLflow Models & Model Registry" - Read more in <a href="https://mlflow.org/" target="_blank">MLflow.org</a>

In this blog, we will only create a basic usage of MLflow where it logs a model, save and track.

### Setup
You can install MLflow in workspace library or you using python command. In this sample, we're going to use the python notebook.

{{highlight ruby linenos}}
    dbutils.library.installPyPI("mlflow")
    dbutils.library.restartPython()
{{endhighlight}}
And we import it.
{{highlight ruby linenos}}
    # Import mlflow
    import mlflow
    import mlflow.sklearn

    # import for unique folder naming
    import uuid
{{endhighlight}}

### Basic Usage

{{highlight ruby linenos}}
    # create unique folder number
    unique_folder = str(uuid.uuid1())

    def train_and_log_model(data):
        # Split dataset into training set and test set
        x_train, x_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.3,random_state=109)

        # Start an MLflow run; the "with" keyword ensures we'll close the run even if this cell crashes
        with mlflow.start_run():
            model = GaussianNB()

            # train the model
            model.fit(x_train,y_train)

            # Predict
            preds = model.predict(x_test)
            
            mlflow.sklearn.log_model(model, "model")
            modelpath = "/dbfs/mlflow/"+unique_folder+"/model"
            mlflow.sklearn.save_model(model, modelpath)
            
            client = mlflow.tracking.MlflowClient()
            active_run = client.get_run(mlflow.active_run().info.run_id).data
            log_model_history_json = json.loads(active_run.tags['mlflow.log-model.history'])
            log_model_history_data = log_model_history_json[0]
            return log_model_history_data['run_id']
{{endhighlight}}

Use it

{{highlight ruby linenos}}
    run_id = train_and_log_model(data) # call to run
    print(run_id)
    # result 1ccc2a132124468e91e4ea636b6f4023
{{endhighlight}}

You can view the Run tab to see the log model.
<img src="https://user-images.githubusercontent.com/10904957/85848619-0b63cf00-b7dc-11ea-92e3-0a2af8598f52.png" alt="How to Get the Current Run ID in Azure Databricks | Mark Deanil Vicente" width="100%">

<img src="https://user-images.githubusercontent.com/10904957/85849020-c4c2a480-b7dc-11ea-852b-86e7bda30e07.png" alt="How to Get the Current Run ID in Azure Databricks | Mark Deanil Vicente" width="100%">

In the above code, after we save our model, we use the `mlflow.tracking.MlflowClient()` class. What is <a href="https://mlflow.org/docs/latest/python_api/mlflow.tracking.html" target="_blank">MlFlow.Tracking</a>? It is a module that provides Python CRUD interface to MLflow experiments and runs. `MlflowClient()` class has many methods, but what we need is the `get_run(id)` because it fetches the run from the backend store within the current notebook and the resulting run contains a collection of run metadata, as well as a collection of run parameters, tags, and metrics.

I would also advice if you also add more mlflow tracking model logs like `Parameters`, `Metrics`, `Tags` and even notes in saving your model.

Learn more from <a href="https://mlflow.org/docs/latest/index.html" target="_blank">MLFlow Documetation</a>

If you have some questions or comments, please drop it below 👇 :)
