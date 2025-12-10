# OpenShift Redis Application

This project is a simple app with features a web frontend built with HTML and JavaScript, a Node.js backend, and uses Redis for persistent data storage.

Project Structure
OpenShift-redis-app/
├── public/                 # Static frontend files (HTML, JS, CSS)
├── Db.js                  # Database connection and logic module
├── solution.js            # Main Node.js application entry point
├── package.json           # Node.js project metadata and dependencies
├── package-lock.json      # Locked dependency versions
├── Dockerfile             # Instructions to build the application container
├── openshift-deploy.yaml  # OpenShift deployment configuration
├── redis-deployment.yaml  # Redis standalone deployment configuration
├── redis-service.yaml     # Redis service definition
└── node_modules/          # Node.js dependencies (not typically committed)
```
Getting Started
Prerequisites
- Node.js 18 or higher
- Redis (for local development)
- OpenShift CLI (`oc`) configured with access to your cluster
- Docker (optional, for local Redis)

### Local Development

1.Clone the repository:
    git clone https://github.com/mahamat-19/OpenShift-redis-app.git
    cd OpenShift-redis-app

2.Install dependencies:
    npm install

3. Run the application locally:
# Port-forward Redis: oc port-forward svc/redis-service 6379:6379
# In another terminal,tape **node solution.js** and The app will run on http://localhost:3000
 # Username: **admin**
 # Password: **distributedsystems**

OpenShift Deployment
Prerequisites
# Redis deployed in OpenShift
# App builds configured

Run the app on the clouds
# live URL :** https://joke-maker-sanalinker-dev.apps.rm2.thpm.p1.openshiftapps.com**
# Username: **admin**
# Password: **distributedsystems**

 check list :
# List deployments: **oc get deployments**
# List services: **oc get svc**
# List pods : **oc get pods**

1.  Build the image from the project root: docker build -t openshift-redis-app:latest
2.  Run the container locally to test:
    docker run -p 3000:3000 openshift-redis-app:latest
### Deploying to OpenShift

This repository provides the necessary resources to deploy both the application and its Redis dependency.

2.Deploy Redis:
    oc apply -f redis-deployment.yaml
    oc apply -f redis-service.yaml

3.  **Deploy the Application:**
    ```bash
    oc apply -f openshift-deploy.yaml
    ```

4.  **Expose the service to create a public route:**
    ```bash
    oc expose svc/openshift-redis-app-service
    ```

5.  Get the application URL:
    oc get route
