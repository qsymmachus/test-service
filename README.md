Test Service
============

This is a simple service I use to test and experiment with on new infrastructure.

The service is just an HTTP server with a single `GET` endpoint. The fun stuff is found in the configuration and tooling for deploying the service. Read on for details!

Dependencies
------------

* [Go](https://golang.org/doc/install), to run the service as-is with no frills.
* [Docker](https://www.docker.com/) if you'd like build and run the service as a docker container.
* [Kubernetes](https://kubernetes.io/) to get fancy and run the service on a kubernetes cluster.

Local Usage
-----------

The following guide assumes you already have `go` installed.

To compile the server:

```
go build ./server.go
```

To run the server:

```
./server
```

By default, the server is exposed on [http://localhost:8080](http://localhost:8080)

Docker
------

The service can also run as a docker container. Take a look at `Dockerfile` to see how it works.

I've also created some handy scripts to make it easier to run common docker tasks (check out `docker`). You must have docker installed locally for these to work.

To build the container:

```
./docker/build-image.sh
```

To run the container:

```
./docker/run-container.sh
```

To stop the container:

```
./docker/stop-container.sh
```

The docker container maps the server to port `8080`, so you can access it at [http://localhost:8080](http://localhost:8080). I might make this port configurable later.

Kubernetes
----------

If you have a Kubernetes cluster running on your machine, you can also deploy the service on Kubernetes!

We have a couple different deployment profiles you can use, all organized under the `/kubernetes` directory.

### Simple deployment

`kubernetes/simple-deployment.yaml` is our simplest deployment. It just deploys one replica with no wrapping service to expose the server's endpoint.

To deploy, run the following command:

```
kubectl apply -f kubernetes/simple-deployment.yaml
```

Since we've specified no [service](https://kubernetes.io/docs/concepts/services-networking/service/) for this deployment, it is only accessible _within_ the cluster. If you'd like to hit the server anyway, you can set up a proxy to the Kubernetes cluster with the following commands.

First, spin up the Kubernetes proxy:

```
kubectl proxy
```

Next, get the name of the pod you deployed with this command (you'll need this in the next step):

```
kubectl get pods
```

Finally, you can now hit the service at this address, after replacing `POD-NAME` with the name of the pod that was deployed:

```
http://localhost:8001/api/v1/namespaces/default/pods/POD-NAME/proxy/
```

When you're done, you can delete the deployment with this command:

```
kubectl delete -f kubernetes/simple-deployment.yaml
```

### NodePort deployment

A slightly more advanced deployment is configured in `kubernetes/nodeport-deployment.yaml`.

This includes the simple deployment we defined earlier, but also adds a `Service` that exposes the deployment outside the Kubernetes cluster. We're using a [NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#nodeport) service, which maps the deployment to a specified port.

To deploy, run the following command:

```
kubectl apply -f kubernetes/nodeport-deployment.yaml
```

Once deployed, you can now hit the service at [http://localhost:30080](http://localhost:30080)

To delete this deployment:

```
kubectl delete -f kubernetes/nodeport-deployment.yaml
```

Helm
----

Now we're getting goofy. Helm is a package manager for Kubernetes, allowing you to you to package descriptions of Kubernetes applications in [charts](https://helm.sh/docs/developing_charts/). You can share, reuse, and extend charts.

We have a chart for the test service under `chart/test-service`. You should [install Helm](https://helm.sh/docs/using_helm/#installing-helm), and read the [Helm docs](https://helm.sh/docs/using_helm/#using-helm) or your [own notes](https://github.com/qsymmachus/notes/blob/master/kubernetes.md#using-helm-and-charts) to learn how to use it in depth, but for now, here's a quick guide.

In install the test service using our chart, run this command:

```
helm install --name=my-test-service ./chart/test-service
```

Our chart uses the same service/deployment configuration we have in `kubernetes/nodeport-deployment.yaml`, but we have templated most config values. Take a look at the files in `chart/test-service/templates` to see how this works, and try changing some of the default config values in `chart/test-service/values.yaml`.

You can see useful information about the Helm release with this command:

```
helm status my-test-service
```

When you're ready to tear it down:

```
helm delete --purge my-test-service
```
