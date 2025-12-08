# Joke Maker Project

A simple Node.js + Express authentication demo deployed on OpenShift with Docker.

## Project Structure

```
.
├── solution.js           # Main Express app
├── package.json          # Dependencies
├── Dockerfile            # Docker container config
├── openshift-deploy.yaml # OpenShift deployment config
├── public/               # Static HTML files
│   ├── index.html        # Login page
│   └── secret.html       # Protected page
└── README.md             # This file
```

## How It Works

1. **User visits** the app → sees login form (`index.html`)
2. **Submits password** → POST request to `/check`
3. **Password correct?** → Shows secret page (`secret.html`)
4. **Wrong password?** → Shows login again

## Local Development

### Prerequisites
- Node.js 18+
- Docker (optional)

### Run Locally

```bash
# Install dependencies
npm install

# Start the server
node solution.js

# Open browser
# http://localhost:3000
# Password: distributedsystems
```

### Build Docker Image

```bash
docker build -t joke-maker:latest .
docker run -p 3000:3000 joke-maker:latest
```

## Deploy to OpenShift

### Prerequisites
- OpenShift CLI (`oc`)
- OpenShift cluster access
- Logged in: `oc login --token=<TOKEN> --server=<SERVER>`

### Deployment Steps

```bash
# Set project
oc project sanalinker-dev

# Build Docker image in OpenShift
oc start-build joke-maker --from-dir=. --wait -n sanalinker-dev

# Deploy application
oc apply -f openshift-deploy.yaml -n sanalinker-dev

# Wait for pods
oc wait --for=condition=ready pod -l app=joke-maker -n sanalinker-dev --timeout=300s

# Get application URL
oc get route joke-maker -n sanalinker-dev -o jsonpath='{.spec.host}'
```

## See Changes Live

After editing code in VS Code:

```bash
# Commit changes
git add .
git commit -m "Your change description"

# Rebuild Docker image
oc start-build joke-maker --from-dir=. --wait -n sanalinker-dev

# Restart deployment
oc rollout restart deployment/joke-maker -n sanalinker-dev

# Refresh browser after 30-60 seconds
```

## Useful Commands

```bash
# View pod logs
oc logs -f deployment/joke-maker -n sanalinker-dev

# Check pod status
oc get pods -n sanalinker-dev -l app=joke-maker

# Scale replicas
oc scale deployment/joke-maker --replicas=3 -n sanalinker-dev

# Describe deployment
oc describe deployment/joke-maker -n sanalinker-dev

# View build logs
oc logs -f bc/joke-maker -n sanalinker-dev
```

## App URL

**Live:** `https://joke-maker-sanalinker-dev.apps.rm2.thpm.p1.openshiftapps.com`

**Password:** `distributedsystems`

## Architecture

- **Frontend:** HTML forms
- **Backend:** Node.js + Express
- **Middleware:** body-parser, passwordCheck
- **Container:** Docker (Node 18 Alpine)
- **Orchestration:** OpenShift (Kubernetes)
- **Routing:** OpenShift Route (HTTPS with edge termination)

## Files Overview

| File | Purpose |
|------|---------|
| `solution.js` | Express server with routes & middleware |
| `public/index.html` | Login form |
| `public/secret.html` | Protected page (shown after auth) |
| `Dockerfile` | Docker image definition |
| `openshift-deploy.yaml` | K8s/OpenShift manifest (Deployment, Service, Route) |
| `package.json` | Node.js dependencies (Express, body-parser) |

## Notes

⚠️ **Security:** The global `userIsAuthorised` flag is NOT per-user. Use sessions or JWT for production.

For questions or improvements, edit files and push changes — they'll auto-deploy on the cloud!
