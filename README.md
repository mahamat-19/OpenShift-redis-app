# OpenShift Redis Application

This project is a simple app with features a web frontend built with HTML and JavaScript, a Node.js backend, and uses Redis for persistent data storage.

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
# In another terminal, enter **node solution.js** and The app will run on http://localhost:3000

 # Username: **admin**
 # Password: **distributedsystems**

**OpenShift Deployment**

Prerequisites
# Redis deployed in OpenShift
# App builds configured

Run the app on the clouds: 
# live URL :** https://joke-maker-sanalinker-dev.apps.rm2.thpm.p1.openshiftapps.com**
# Username: **admin**
# Password: **distributedsystems**

to see any changes of  code in VS Code (e.g., modify  HTML files)
#Commit and push to Git
#cd to project file
 and enter the cmd: **oc start-build joke-maker --from-dir=. --wait -n sanalinker-dev
oc rollout restart deployment/joke-maker -n sanalinker-dev**


