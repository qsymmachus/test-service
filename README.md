Test Service
============

This is a simple service I use to test and experiment with on new infrastructure.

The service is just a Node HTTP server with a single `GET` endpoint. The fun stuff is found in the configuration and tooling for deploying the service. Read on for details!

Local Usage
-----------

The following guide assumes you already have `node` and `npm` installed.

Install all dependencies:

```
npm install
```

Spin up the server locally:

```
npm start
```

By default, the server is exposed on [http://localhost:8080](http://localhost:8080)

Docker
------

The service can also run as a docker container. Take a look at `Dockerfile` to see how it works.

I've also created some handy scripts to make it easier to run common docker tasks (check out `scripts`). You must have docker installed locally for these to work.

To build the container:

```
npm run-script docker-build
```

To run the container:

```
npm run-script docker-run
```

To stop the container:

```
npm run-script docker-stop
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
